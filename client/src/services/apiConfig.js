import axios from "axios";

let apiUrl;

const apiUrls = {
  production: process.env.PROD_URL,
  development: "http://localhost:8000/api",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
