import axios from "axios";
import cheerio from "cheerio";

let cookies: string = "";

const AxiosInstance = axios.create({
  baseURL: "https://ava.ead.unip.br/",
  withCredentials: true,
});

const user = {
  user_id: 2310750,
  password: "Wrbrew1t@",
  login: "ENTRAR",
  action: "login",
};

async function init() {
  if (!isAuthenticated()) {
    await getCredentials();
    await doLogin();
  }
  const $ = await getCheerioInstance();
}

async function getCheerioInstance(url = "/"): Promise<cheerio.Root> {
  const response = await AxiosInstance.get(url);
  const html: string = response.data;
  return cheerio.load(html);
}

function isAuthenticated(): boolean {
  return cookies.length > 0;
}

async function getCredentials() {
  await AxiosInstance.get("/").then(r =>  {
    const cookies =  r.headers['set-cookie'];
    console.log("🚀 ~ file: index.ts:39 ~ awaitAxiosInstance.get ~ cookies:", cookies)
  });
}

async function doLogin() {
  const loginResponse = await AxiosInstance.post("/webapps/login/", user)
  const $ = cheerio.load(loginResponse.data);
  const cookies =  loginResponse.headers['cookie'];
  // console.log('Cookies:', cookies);  console.log("🚀 ~ file: index.ts:39 ~ doLogin ~ $('#loginErrorMessage'):", $.html().slice(0, 100))
}

init();
