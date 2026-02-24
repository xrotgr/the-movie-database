import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchPopular = async ({ pageParam = 1 }) => {
  try {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: { language: 'en-US', page: pageParam },
      },
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
