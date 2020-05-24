import axios from "axios";
const instance = axios.create({
  baseURL: "https://react-burger-2b672.firebaseio.com/",
});
export default instance;
