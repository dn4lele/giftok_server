const { default: axios } = require("axios");

module.exports = {
  getsmallgif: async () => {
    try {
      const result = await axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=${process.env.THE_KEY}`
      );

      const { data } = result.data;
      const { images } = data;
      const { fixed_height } = images;
      return fixed_height.url;
    } catch (err) {
      console.error(err); // Use console.error for errors
    }
  },

  getgifsbyname: async (q) => {
    try {
      const result = await axios.get(
        `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${process.env.THE_KEY}`
      );

      let gifsurl = [];

      const { data } = result.data;

      data.forEach((gif) => {
        const { images } = gif;
        const { fixed_height } = images;
        gifsurl.push(fixed_height.url);
      });

      return gifsurl;
    } catch (err) {
      console.error(err);
    }
  },
};
