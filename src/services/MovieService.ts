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
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjkzZjQzZmQyZTk1Y2QwOTUwZTdkZGQwNmM0NzE3YSIsIm5iZiI6MTc2MjI3MTgwMi43Niwic3ViIjoiNjkwYTIyM2E0NDBlNzViNzczMWU1ZGYwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.c1_bF--GF3qnn4KIW6tSihpLD0XC58e2ARnHt1t5VSI `,
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
