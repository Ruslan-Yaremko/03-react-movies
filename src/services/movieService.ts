import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
}

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: "application/json",
  },
});
export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axiosInstance.get<FetchMoviesResponse>(
    "/search/movie",
    {
      params: {
        query,
      },
    },
  );

  return response.data.results;
}
