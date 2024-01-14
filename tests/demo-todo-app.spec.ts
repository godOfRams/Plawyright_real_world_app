import { test, expect, type Page } from "@playwright/test";
import { db_seed } from "./support_commands.ts";
import { apiGraphQL } from "./constants.ts";

// await this.page.waitForResponse(async (resp) => {
//   const body = (await resp.json());
//   return !!body?.data?.someProperty;
// });

test.describe("User Sign-up and Login", () => {
  test.beforeEach(async ({ page }) => {
    await db_seed();

    // const waitForSignUpRequest = page.waitForRequest((request) => request.url().includes("/users"));
    // await waitForSignUpRequest;
    // const gqlCreateBankAccountMutation = page.waitForRequest(
    //   (response) => response.url() === "apiGraphQL"
    // );
    // let response = await gqlCreateBankAccountMutation;
    // console.log(response);
    // gqlCreateBankAccountMutation
  });

  test.only("should redirect unauthenticated user to sign-in page", async ({ page }) => {
    await page.goto("/personal");
    await expect(page.url()).toContain("/signin");
    // // create a new todo locator
    // const newTodo = page.getByPlaceholder('What needs to be done?');
    // // Create 1st todo.
    // await newTodo.fill(TODO_ITEMS[0]);
    // await newTodo.press('Enter');
    // // Make sure the list only has one todo item.
    // await expect(page.getByTestId('todo-title')).toHaveText([
    //   TODO_ITEMS[0]
    // ]);
    // // Create 2nd todo.
    // await newTodo.fill(TODO_ITEMS[1]);
    // await newTodo.press('Enter');
    // // Make sure the list now has two todo items.
    // await expect(page.getByTestId('todo-title')).toHaveText([
    //   TODO_ITEMS[0],
    //   TODO_ITEMS[1]
    // ]);
    // await checkNumberOfTodosInLocalStorage(page, 2);
  });

  // test("should redirect to the home page after login", async ({ page }) => {});

  // test("should remember a user for 30 days after login", async ({ page }) => {});

  // test("should allow a visitor to sign-up, login, and logout", async ({ page }) => {});

  // test("should display signup errors", async ({ page }) => {});

  // test("should error for an invalid user", async ({ page }) => {});

  // test("should error for an invalid password for existing user", async ({ page }) => {});
});
