import axios from "axios";

export const api = axios.create({
  baseURL: "https://todo-app-zybe.onrender.com",
});
