import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", 
  withCredentials: true, // For cookie-based authentication
});

// Example: Signup
export const signup = (data) => API.post("/auth/signup", data);

// Example: Login
export const login = (data) => API.post("/auth/login", data);

// Example: Logout
export const logout = () => API.post("/auth/logout");

// Example: Fetch Trending Videos
export const getTrendingVideos = () => API.get("/videos/trend");

// Example: Fetch Random Videos
export const getRandomVideos = () => API.get("/videos/random");

export default API;
