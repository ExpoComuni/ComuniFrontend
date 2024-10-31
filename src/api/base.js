import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "localhost:3000",
    timeout: 10000,
})

