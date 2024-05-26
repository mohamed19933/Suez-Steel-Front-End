import axios from "axios";
import { baseUrl } from "../index";
import Cookie from "cookie-universal";

const token = Cookie().get("Token");

export const Axios = axios.create({
  baseURL: baseUrl,
  headers: { authorization: "Bearer " + token },
});
