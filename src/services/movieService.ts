import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movie.ts";

const API_BASE = "https://api.themoviedb.org/3";

const token = import.meta.env.VITE_TMDB_TOKEN as string;

if (!token) {
  console.error("VITE_TMDB_TOKEN is not set!");
}

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {

    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  };

  const response: AxiosResponse<MoviesResponse> = await axiosInstance.get(
    "/search/movie",
    config
  );
  return response.data.results;
}
