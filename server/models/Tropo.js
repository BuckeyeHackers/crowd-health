/* globals Headers */
const fetch = require('isomorphic-fetch');

class Tropo {
  static sendMessageToNumbers(message, numbers) {
    const headers = new Headers({ 'X-Tropo-Message': message });

    numbers.forEach((number) => {
      const formattedNumber = number.indexOf('+') >= 0
        ? number
        : `+1${number}`;

      headers.append('X-Tropo-Number', formattedNumber);
    });

    return fetch(`https://api.tropo.com/1.0/sessions?action=create&token=${process.env.TROPO_MESSAGE_KEY}`, {
      method: 'GET',
      headers,
    });
  }
}

module.exports = Tropo;
