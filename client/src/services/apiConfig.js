import axios from "axios";


let apiUrl;

const apiUrls = {
  production: "https://less-carbon-mongodb-api.onrender.com/api",
  development: "http://localhost:8000/api",
};

console.log(prodUrl)

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

const api = axios.create({
  baseURL: apiUrl,
});

export default api;


