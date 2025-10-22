const BASE_URL = ""; 

// Prideda filmą į vartotojo bookmarks
export const addBookmark = async (movieId, userId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movieId, userId }),
    });

    if (!response.ok) throw new Error("Failed to add bookmark");
    const data = await response.json();
    return data; // grąžina patvirtinimą arba naują bookmarks sąrašą
  } catch (error) {
    console.error("Add Bookmark API Error:", error);
    return null;
  }
};

// Pašalina filmą iš vartotojo bookmarks
export const removeBookmark = async (movieId, userId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/bookmarks/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) throw new Error("Failed to remove bookmark");
    const data = await response.json();
    return data; // grąžina patvirtinimą arba naują bookmarks sąrašą
  } catch (error) {
    console.error("Remove Bookmark API Error:", error);
    return null;
  }
};

// Gauna visus vartotojo bookmarks
export const getBookmarks = async (userId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/bookmarks/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch bookmarks");
    const data = await response.json();
    return data; // grąžina masyvą bookmarked filmų
  } catch (error) {
    console.error("Get Bookmarks API Error:", error);
    return [];
  }
};
