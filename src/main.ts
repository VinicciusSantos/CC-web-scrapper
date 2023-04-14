import axios from "axios";
import { getLoginCredentials } from "./getCredentials";
import { BASE_URL, Pages } from "./pages";
import cheerio from "cheerio";

interface Course {
  name: string;
  url: string;
}

const AxiosInstance = axios.create({ baseURL: BASE_URL });

async function main() {
  const cookies = await getLoginCredentials();
  AxiosInstance.defaults.headers.common["Cookie"] = cookies;
  const courses = await getAllCourses();
}

async function getAllCourses(): Promise<Course[]> {
  const allCoursesPage = await AxiosInstance.get(Pages.ALL_COURSES);
  const $ = cheerio.load(allCoursesPage.data);
  const courses = $("#column0 .courseListing > li > a");
  return Object.values(courses)
    .filter((e: cheerio.TagElement) => e.attribs)
    .map((e: cheerio.TagElement) => {
      return {
        name: e.children[0].data,
        url: e.attribs.href,
      };
    });
}

main();
