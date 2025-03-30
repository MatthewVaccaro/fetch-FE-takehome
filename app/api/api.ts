import axios from "axios";

export const API = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  withCredentials: true,
});
