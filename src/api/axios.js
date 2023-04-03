import axios from "axios";

export default axios.create({
  baseURL: "https://tekdevisal.uc.r.appspot.com/api/v1/",
//   baseURL: "http://localhost:3001/api/v1/",
});
