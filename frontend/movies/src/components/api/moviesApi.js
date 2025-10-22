// Gauna populiariausius filmus (trending) ir grąžina masyvą filmų
export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch trending movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Trending API Error:", error);
    return [];
  }
};

// Ieško filmų pagal užklausą ir grąžina masyvą filmų
export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Search failed");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Search API Error:", error);
    return [];
  }
};

// Gauna vieno filmo detales pagal ID ir grąžina objektą
export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Movie details fetch failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Movie Details API Error:", error);
    return null;
  }
};
