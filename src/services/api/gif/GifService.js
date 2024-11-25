import axios from "axios";

class GifService {
  constructor() {
    this.gifUrl = `${process.env.GIFY_URL}`;
  }
  async getTrendingGif() {
    try {
      const res = axios.get(`${this.gifUrl}/trending`, { params: { api_key: process.env.GIFY_API } });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async getGifByQuery(query, setLoading, options = {}) {
    try {
      setLoading(true);
      const res = await axios.get(`${this.gifUrl}/search`, {
        params: { api_key: process.env.GIFY_API, q: query },
        ...options,
      });

      return res;
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
}

export const gifService = new GifService();
