import axios from "axios";
import { UNIP_BASE_URL } from "../../../../entities/pages";

export const AxiosInstance = axios.create({
  baseURL: UNIP_BASE_URL,
  withCredentials: true,
});
