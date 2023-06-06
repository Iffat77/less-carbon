import axios from "axios";


let apiUrl;

const apiUrls = {
  production: "https://less-carbon-mongodb-api.onrender.com/api",
  // development: "http://localhost:8000/api",
};

apiUrl = apiUrls.production;

// if (window.location.hostname === "localhost") {
//   apiUrl = apiUrls.development;
// } else {
// }
console.log(apiUrl)
const api = axios.create({
  baseURL: apiUrl,
});


export default api;


