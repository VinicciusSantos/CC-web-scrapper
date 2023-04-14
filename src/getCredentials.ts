import { Builder, By, IWebDriverCookie, WebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { BASE_URL, Pages } from "./pages";

interface FormField {
  id: string;
  value?: string;
  isSubmitButton?: boolean;
}

const formFields: FormField[] = [
  { id: "user_id", value: "aaaaa" },
  { id: "password", value: "bbbbb" },
  { id: "entry-login", isSubmitButton: true },
];

export async function getLoginCredentials(): Promise<string> {
  const driver = await configureWebDriver();
  await submitLoginForm(driver);
  const cookies = await getPageCookies(driver);
  await driver.quit();
  return cookies;
}

async function configureWebDriver(): Promise<WebDriver> {
  const options = new ChromeOptions();
  const builder = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  await builder.get(BASE_URL);
  return builder;
}

async function submitLoginForm(driver: WebDriver) {
  for (let field of formFields) {
    const element = await driver.findElement(By.id(field.id));
    if (field.isSubmitButton) await element.click();
    if (field.value) await element.sendKeys(field.value);
  }
  await checkIfLoginWasSuccessful(driver);
}

async function checkIfLoginWasSuccessful(driver: WebDriver) {
  const url = await driver.getCurrentUrl();
  if (!url.includes(Pages.HOME)) {
    throw new Error("Invalid Login Credentials!");
  }
}

async function getPageCookies(driver: WebDriver): Promise<string> {
  const cookies = await driver.manage().getCookies();
  const formattedCookies: string = cookies
    .reduce((acc: string, cookie: IWebDriverCookie) => {
      return acc + `${cookie.name} = ${cookie.value}; `;
    }, "")
    .trim();
  return formattedCookies;
}
