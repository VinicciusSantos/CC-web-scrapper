import {
  Builder,
  By,
  IWebDriverCookie,
  WebDriver,
} from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";

interface FormField {
  id: string;
  value?: string;
  isSubmitButton?: boolean;
}

const formFields: FormField[] = [
  { id: "user_id", value: "aaaaaaaaaaaa" },
  { id: "password", value: "bbbbbbbbbbb" },
  { id: "entry-login", isSubmitButton: true },
];

async function getLoginCredentials(): Promise<string> {
  const driver = configureWebDriver();
  await driver.get("https://ava.ead.unip.br/");

  for (let field of formFields) {
    const element = await driver.findElement(By.id(field.id));
    if (field.isSubmitButton) await element.click();
    if (field.value) await element.sendKeys(field.value);
  }

  const cookies = await driver.manage().getCookies();
  const formattedCookies: string = cookies
    .reduce((acc: string, cookie: IWebDriverCookie) => {
      return acc + `${cookie.name} = ${cookie.value}; `;
    }, "")
    .trim();

  await driver.quit();
  return formattedCookies;
}

function configureWebDriver(): WebDriver {
  const options = new ChromeOptions();
  const builder = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  return builder;
}

getLoginCredentials();
