const fetch = require('isomorphic-fetch');

class Tropo {
  static sendMessageToNumbers(message, numbers) {
    return Promise.all(
      numbers.map(number => number.replace(/\D+/, '').replace('+', '')).map(number =>
        fetch(`https://api.tropo.com/1.0/sessions?action=create&token=${process.env.TROPO_MESSAGE_KEY}&number=${number}&msg=${message.replace(' ', '+')}`, {
          method: 'GET',
        }))
    );
  }
}

module.exports = Tropo;
