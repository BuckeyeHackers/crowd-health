require_relative "./zip_file_generator"

require "mechanize"

class PillScraper
  def initialize
    @agent = Mechanize.new
    @top_40_page = @agent.get("https://www.drugs.com/drug_information.html")
    @pill_identifier = @agent.get("https://www.drugs.com/imprints.php")
    @find_by_name_form = @pill_identifier.forms.find { |form| !form["drugname"].nil? }
    @pill_image_dir = "./lib/web_scraping/pill_images"
  end

  def get_pill_images
    create_zips_for_top_40_pills
  end

  private
  def get_list_of_top_40_pills
    @top_40_page.search(".boxListTopDrugs").children.search("a").map { |drug_tag| drug_tag.text }
  end

  def get_first_image_url_for(pill_name)
    @find_by_name_form["drugname"] = pill_name
    results_page = @agent.submit(@find_by_name_form, @find_by_name_form.buttons.first)
    return results_page.images.find { |image| !image.src.index("/images/pills/").nil? }.src
  end

  def create_zips_for_top_40_pills
    puts "creating zips..."

    # get top 40 images
    top_40 = Hash.new
    top_40_pill_names = get_list_of_top_40_pills
    top_40_pill_names.each { |pill_name| top_40[pill_name] = get_first_image_url_for(pill_name) }

    # create zip files for each image (10 images per zip)
    top_40.each_pair do |pill_name, pill_image|
      image = @agent.get(pill_image)
      pill_filename = pill_name.split(/\s+/).join("_")

      10.times do |index|
        image.save "#{@pill_image_dir}/#{pill_filename}/#{pill_filename}#{index}.#{pill_image.split(".").last}"
      end

      output_dir = "#{@pill_image_dir}/#{pill_filename}"
      ZipFileGenerator.new(output_dir, "#{output_dir}.zip").write
      FileUtils::rm_rf(output_dir)
    end

    puts
    puts top_40.keys.join(", ")
    puts
    puts "created zips..."
  end
end
