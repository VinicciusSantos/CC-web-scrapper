import axios from "axios";
import { UNIP_BASE_URL } from "../../../../entities/pages";
import cheerio from "cheerio";
import NotAuthorizedError from "../../application/errors/notAuthorized";
import isInLoginPage from "../../utils/isInLoginPage";

export const AxiosInstance = axios.create({
  baseURL: UNIP_BASE_URL,
  withCredentials: true,
});

AxiosInstance.interceptors.response.use((response) => {
  const $ = cheerio.load(response.data);
  if (isInLoginPage($)) throw new NotAuthorizedError();
  return response;
});
