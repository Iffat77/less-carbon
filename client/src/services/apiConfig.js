import axios from 'axios';

let apiUrl;

const apiUrls = {
  production: "https://architecture-api-group7.herokuapp.com/",
  development: "http://localhost:9000/"
}

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

const api = axios.create({
  baseURL: apiUrl,
});

export default api;