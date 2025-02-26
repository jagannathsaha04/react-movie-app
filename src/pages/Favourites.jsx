import "../css/Favourites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
    const { favourites } = useMovieContext();

    // Show empty state when no favourites are available
    if (favourites.length === 0) {
        return (
            <div className="favourites-empty">
                <h2>No Favourites Yet.</h2>
                <p>Start adding movies to your favourites and they will appear here.</p>
            </div>
        );
    }

    // Show favourites when available
    return (
        <div className="favourites-container">
            <h2>Your Favourite Movies</h2>
            <div className="movies-grid">
                {favourites.map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Favourites;