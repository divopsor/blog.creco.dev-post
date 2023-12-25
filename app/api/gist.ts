import axios from 'axios';

export const API = {
  of: (category: string) => ({
    readList: async () => {
      if (category == null || category === '' || category === 'undefined') {
        return [];
      }
      const { data } = await get(`/api/gist/${category}/list`);
      return data.items;
    },
    readItem: (id: string) => {
      return get(`/api/gist/${category}/${id}`);
    },
  }),
  getList: async () => {
    const { data } = await get(`/api/gist/category`);
    return data;
  },
}

const BASE_URL = '';

async function get(url: string) {
  const { data } = await axios.get(`${BASE_URL}${url}`);

  return data;
}

async function post(url: string, body?: any) {
  const { data } = await axios.post(`${BASE_URL}${url}`, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return data;
}
