import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal";

import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";

import styles from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleSearch(query: string) {
    setMovies([]);
    setSelectedMovie(null);
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchMovies(query);

      if (result.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(result);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.app}>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      <main>
        {isLoading && <Loader />}

        {isError && <ErrorMessage />}

        {!isLoading && !isError && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
