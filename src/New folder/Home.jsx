import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false); // Track if user searched

    useEffect(() => {
        loadPopularMovies();
    }, []);

    const loadPopularMovies = async () => {
        setLoading(true);
        setIsSearching(false); // Reset search mode
        try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        } catch (err) {
            console.error(err);
            setError("Failed to load movies!");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return; // Prevent empty searches

        setLoading(true);
        setIsSearching(true); // User is searching
        setError(null); // Reset error state

        try {
            const searchResults = await searchMovies(searchQuery); // Ensure searchMovies accepts a query
            setMovies(searchResults);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch search results!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {/* Show "Back to Popular Movies" only after searching */}
            {isSearching && (
                <button onClick={loadPopularMovies} className="back-button">
                    Show Popular Movies
                </button>
            )}

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <div className="movies-grid">
                    {movies.length > 0 ? (
                        movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
                    ) : (
                        <p>No movies found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
