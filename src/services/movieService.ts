import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const token = import.meta.env.VITE_TMDB_TOKEN;

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
});

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response: AxiosResponse<FetchMoviesResponse> = await movieApi.get(
    "/search/movie",
    {
      params: {
        query,
      },
    },
  );

  return response.data.results;
}
