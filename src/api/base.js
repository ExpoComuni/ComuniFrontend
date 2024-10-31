import axios from "axios";

export const apiClient = axios.create({
    baseURL: "https://communi-backend.vercel.app/",
    timeout: 10000,
})

