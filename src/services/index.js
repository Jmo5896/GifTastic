import axios from "axios";

const API = {
  getGifs: async (topic, apiKey, limit) => {
    return await axios.get(
      `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=${apiKey}&limit=${limit}`
    );
  },
};

export default API;
