import axios from "axios";
import cheerio from "cheerio";

let cookies = [];

const AxiosInstance = axios.create({
  baseURL: "https://ava.ead.unip.br/",
});

const user = {
  user_id: 7589203495870,
  password: "falksjdfhlkajsdhflkjsad",
  login: "ENTRAR",
  action: "login",
};

let config = { headers: { Cookie: formatCookies() } };

async function init() {
  if (!isAuthenticated()) await doLogin();
  const $ = await getCheerioInstance();
}

async function getCheerioInstance(url = "/"): Promise<cheerio.Root> {
  AxiosInstance.defaults.headers.common["Cookie"] = formatCookies();
  const response = await AxiosInstance.get(url, config);
  const html: string = response.data;
  return cheerio.load(html);
}

function isAuthenticated(): boolean {
  return cookies.length > 0;
}

async function doLogin() {
  const loginResponse = await AxiosInstance.post("/webapps/login/", user);
  cookies = loginResponse.headers["set-cookie"];
}

function formatCookies(): string {
  return cookies.join("; ");
}

init();
