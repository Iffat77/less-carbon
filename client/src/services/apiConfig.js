import axios from "axios";

let apiUrl;
const prod = process.env.REACT_APP_PROD_URL


const apiUrls = {
  production: prod,
  development: "http://localhost:8000/api",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

apiUrl = prod

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
