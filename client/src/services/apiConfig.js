import axios from "axios";


let apiUrl;
const prodUrl = process.env.PROD_URL

const apiUrls = {
  production: prodUrl,
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


