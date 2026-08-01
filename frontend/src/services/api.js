const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : "http://localhost:5000/api";
  console.log("API_URL =", API_URL);


export default API_URL;