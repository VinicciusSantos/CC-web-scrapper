import { Injectable } from '@angular/core';
import { Builder, By, IWebDriverCookie, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

import { FormField, loginUnipFields } from '../entities/formFields';
import { Pages, UNIP_BASE_URL } from '../entities/pages';

@Injectable({
  providedIn: 'root',
})
export default class GetCredentials {
  private formFields: Record<loginUnipFields, FormField> = {
    userId: { id: 'user_id' },
    password: { id: 'password' },
    submitButton: { id: 'entry-login', isSubmitButton: true },
  };

  constructor() {}

  public async execute(userId: string, password: string): Promise<string> {
    this.saveInpurValues(userId, password);
    const driver = await this.configureWebDriver();
    await this.submitLoginForm(driver);
    const cookies = await this.getPageCookies(driver);
    await driver.quit();
    return cookies;
  }

  private saveInpurValues(userId: string, password: string): void {
    this.formFields.userId.value = userId;
    this.formFields.password.value = password;
  }

  private async configureWebDriver(): Promise<WebDriver> {
    const options = new ChromeOptions();
    const builder = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    await builder.get(UNIP_BASE_URL);
    return builder;
  }

  private async submitLoginForm(driver: WebDriver) {
    for (let field of Object.values(this.formFields)) {
      const element = await driver.findElement(By.id(field.id));
      if (field.isSubmitButton) await element.click();
      if (field.value) await element.sendKeys(field.value);
    }
    await this.checkIfLoginWasSuccessful(driver);
  }

  private async checkIfLoginWasSuccessful(driver: WebDriver) {
    const url = await driver.getCurrentUrl();
    if (!url.includes(Pages.HOME)) {
      throw new Error('Invalid Login Credentials!');
    }
  }

  private async getPageCookies(driver: WebDriver): Promise<string> {
    const cookies = await driver.manage().getCookies();
    const formattedCookies: string = cookies
      .reduce((acc: string, cookie: IWebDriverCookie) => {
        return acc + `${cookie.name} = ${cookie.value}; `;
      }, '')
      .trim();
    return formattedCookies;
  }
}
