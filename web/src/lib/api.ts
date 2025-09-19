import axios from "axios";
import { API_BASE } from "./constants";

export const api = axios.create({
  baseURL: API_BASE ?? "/",
});
