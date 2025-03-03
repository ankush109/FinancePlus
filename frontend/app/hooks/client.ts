import axios from "axios";

const BASE_URL = "http://localhost:5000/v1";

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Check if window is defined to prevent SSR errors
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const AUTH_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    ...(token && { authorization: `Bearer ${token}` }),
    "Content-Type": "application/json",
  },
});
