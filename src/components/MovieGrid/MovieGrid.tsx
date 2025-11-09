import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies || movies.length === 0) return null;

  const imgBase = "https://image.tmdb.org/t/p/w500";

  return (
    <ul className={styles.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div
            className={styles.card}
            onClick={() => onSelect(m)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect(m);
            }}
          >
            <img
              className={styles.image}
              src={m.poster_path ? `${imgBase}${m.poster_path}` : undefined}
              alt={m.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
