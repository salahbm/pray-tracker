import { expect, test } from "@playwright/test"

test.describe("Request Form E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/request")
  })

  test("should display request form with progress bar", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Tell me about your project/i })).toBeVisible()
    await expect(page.getByText("1")).toBeVisible() // Step indicator
  })

  test("should complete full request form flow", async ({ page }) => {
    // Step 1: Select category and form
    await page
      .getByRole("button", { name: /홈페이지/i })
      .first()
      .click()
    await page
      .getByRole("button", { name: /반응형 웹사이트/i })
      .first()
      .click()
    await page.getByRole("button", { name: /다음|Next/i }).click()

    // Step 2: Select task scope
    await page
      .getByRole("button", { name: /프로젝트 관리/i })
      .first()
      .click()
    await page.getByRole("button", { name: /다음|Next/i }).click()

    // Step 3: Select development type and location/budget
    await page
      .getByRole("button", { name: /PC 웹사이트/i })
      .first()
      .click()
    await page.getByRole("button", { name: /국내/i }).first().click()
    await page
      .getByRole("button", { name: /3천만원/i })
      .first()
      .click()
    await page
      .getByRole("button", { name: /4~6개월/i })
      .first()
      .click()
    await page.getByRole("button", { name: /다음|Next/i }).click()

    // Step 4: Fill in project details
    await page.getByRole("button", { name: /미정/i }).first().click()
    await page.getByPlaceholder(/프로젝트 제목/i).fill("Test Project Title")
    await page.getByPlaceholder(/간단한 설명/i).fill("This is a test project description for E2E testing")
    await page
      .getByPlaceholder(/상세 내용/i)
      .fill("This is detailed content for the test project. It needs to be at least 20 characters long.")

    // Fill client information
    await page.getByPlaceholder(/회사명/i).fill("Test Company")
    await page.getByPlaceholder(/담당자명/i).fill("John Doe")
    await page.getByPlaceholder(/이메일/i).fill("test@example.com")
    await page.getByPlaceholder(/연락처/i).fill("010-1234-5678")

    // Submit form
    await page.getByRole("button", { name: /제출|Submit/i }).click()

    // Wait for success message or redirect
    await page.waitForURL("/", { timeout: 5000 })
  })

  test("should show validation errors for empty required fields", async ({ page }) => {
    // Try to go to next step without filling anything
    await page.getByRole("button", { name: /다음|Next/i }).click()

    // Should show error messages
    await expect(page.getByText(/필수 입력 항목입니다|This field is required/i).first()).toBeVisible()
  })

  test("should navigate between steps", async ({ page }) => {
    // Fill step 1
    await page
      .getByRole("button", { name: /홈페이지/i })
      .first()
      .click()
    await page
      .getByRole("button", { name: /반응형 웹사이트/i })
      .first()
      .click()
    await page.getByRole("button", { name: /다음|Next/i }).click()

    // Should be on step 2
    await expect(page.getByText("2")).toBeVisible()

    // Go back
    await page.getByRole("button", { name: /이전|Previous/i }).click()

    // Should be back on step 1
    await expect(page.getByText("1")).toBeVisible()
  })

  test("should upload files", async ({ page }) => {
    // Navigate to file upload step
    await page
      .getByRole("button", { name: /홈페이지/i })
      .first()
      .click()
    await page
      .getByRole("button", { name: /반응형 웹사이트/i })
      .first()
      .click()
    await page.getByRole("button", { name: /다음|Next/i }).click()
    await page
      .getByRole("button", { name: /프로젝트 관리/i })
      .first()
      .click()
    await page.getByRole("button", { name: /다음|Next/i }).click()
    await page
      .getByRole("button", { name: /PC 웹사이트/i })
      .first()
      .click()
    await page.getByRole("button", { name: /국내/i }).first().click()
    await page
      .getByRole("button", { name: /3천만원/i })
      .first()
      .click()
    await page
      .getByRole("button", { name: /4~6개월/i })
      .first()
      .click()
    await page.getByRole("button", { name: /다음|Next/i }).click()

    // Upload file
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles({
      name: "test.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("test file content"),
    })

    // File should be listed
    await expect(page.getByText("test.pdf")).toBeVisible()
  })
})
