import { Page, Locator,expect } from '@playwright/test';
import percySnapshot from "@percy/playwright";
import axios from "axios";
import _ from "lodash";
import dotenv from "dotenv";
dotenv.config();

export class BasePage {
  protected page: Page;
  readonly testDataApiEndpoint:string
  readonly apiGraphQL:string

  constructor(page: Page) {
    this.page = page;
    this.testDataApiEndpoint=`${process.env.API_URL}/testData`;
    this.apiGraphQL =`${this.testDataApiEndpoint}/graphql`;
  }

  //  DATABASE:
  async queryDatabase({ entity, query }, callback): Promise<any> {
    try {
      const fetchData = async (attrs) => {
        const { data } = await axios.get(`${this.testDataApiEndpoint}/${entity}`);
        return callback(data, attrs);
      };
    
      return Array.isArray(query) ? Promise.all(query.map(fetchData)) : fetchData(query);
    } catch (error) {
      console.error("Error querying database:", error);
      throw error; 
    }
  }

  async database(operation: "find" | "filter", entity: string, query?: object): Promise<any> {
    const params = { entity, query };
    if (operation === "find") {
      return this.queryDatabase(params, (data, attrs) => _.find(data.results, attrs));
    }
    if (operation === "filter") {
      return this.queryDatabase(params, (data, attrs) => _.filter(data.results, attrs));
    }
  }

  async db_seed(): Promise<any> {
    try {
      const { data } = await axios.post(`${this.testDataApiEndpoint}/seed`);
      return data;
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  }

  async waitForGraphQLRequest(operationName: string) {
    return this.page.waitForResponse(async (resp) => {
      if (resp.url().includes('/graphql')) {
        try {
          const body = await resp.json();
          return body?.data?.hasOwnProperty(operationName);
        } catch (error) {
          return false;
        }
      }
      return false;
    });
  }


  //  ACTIONS:
  async typeInField(field: Locator, text: string): Promise<void> {
    await expect(field).toBeVisible();
    await field.click();
    await field.fill(text);
  }

  async clearField(field: Locator,): Promise<void> {
    await expect(field).toBeVisible();
    await field.clear();
    await field.blur();
  }

  async clickButton(button: Locator): Promise<void> {
    await expect(button).toBeVisible();
    await button.click();
  }

  //  ASSERTIONS:
  async verifyTextAtPageBySelector (selector: Locator,  shouldHaveText:string) {
    await expect(selector).toBeVisible();
    await expect(selector).toHaveText(shouldHaveText);
  };

  async visualSnapshot (maybeName: string) {
    //TODO add default resolution setting 
    await percySnapshot(this.page, maybeName); 
  };
}
