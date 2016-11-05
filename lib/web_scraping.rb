require_relative "./web_scraping/pill_scraper"

scraper = PillScraper.new

scraper.get_pill_images
