import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Dashboard Functionality', () => {
  let dashboardPage;

  // Before each test, navigate to the dashboard
  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToDashboard();
    
    // Add a longer pause to see the page
    await page.waitForTimeout(5000); // 5 second pause
    
    // Verify we're on the dashboard before continuing
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
  });

  test('should display the page correctly', async () => {
    // Get page title and content
    const pageTitle = await dashboardPage.page.title();
    const pageContent = await dashboardPage.page.textContent('body');
    
    // Just check that we got some content (very loose assertion)
    expect(pageContent).toBeTruthy();
    console.log("Page title:", pageTitle);
    console.log("Is page content there?", !!pageContent);
  });
  
  test('should validate page title is "Drive Dollar"', async ({ page }) => {
    // Get the text from the page title element
    const titleElement = page.getByTestId('page-title');
    const titleText = await titleElement.textContent() || '';
    console.log("Title text:", titleText);
    
    // Expected title text
    const expectedTitle = 'Drive Dollar';
    
    // Assert exact equality with a detailed error message that will appear in the report
    expect(
      titleText,
      `Title mismatch: expected "${expectedTitle}" but got "${titleText}"`
    ).toBe(expectedTitle);
    
    console.log(`Page title verified: "${titleText}"`);
  });
  
  test('should be able to select Old Dominion company, verify dynamic price values, and switch views', async ({ page }) => {
    // 1. Select company
    // Click on company dropdown
    await dashboardPage.clickCompanyDropdown();
    
    // Wait to see the dropdown
    await page.waitForTimeout(2000);
    
    // Select Old Dominion
    await dashboardPage.selectOldDominion();
    
    // Wait to see the selection applied
    await page.waitForTimeout(5000);
    
    console.log("Successfully selected Old Dominion company");
    
    // 2. Verify the price data
    
    // Get title texts and verify
    const previousYearTitle = await dashboardPage.getPreviousYearTitle();
    expect(previousYearTitle).toContain('Previous Year');
    
    const currentYearTitle = await dashboardPage.getCurrentYearTitle();
    expect(currentYearTitle).toContain('Current Year');
    
    const yearDifferenceTitle = await dashboardPage.getYearDifferenceTitle();
    expect(yearDifferenceTitle).toContain('Year Difference');
    
    // Get data values
    const previousYearData = await dashboardPage.getPreviousYearData();
    const currentYearData = await dashboardPage.getCurrentYearData();
    const yearDifferenceData = await dashboardPage.getYearDifferenceData();
    
    // Log the values
    console.log("Previous year data:", previousYearData);
    console.log("Current year data:", currentYearData);
    console.log("Year difference data:", yearDifferenceData);
    
    // Convert to numbers
    const previousYearValue = dashboardPage.convertDollarToNumber(previousYearData);
    const currentYearValue = dashboardPage.convertDollarToNumber(currentYearData);
    const yearDifferenceValue = dashboardPage.convertDollarToNumber(yearDifferenceData);
    
    // Verify values are greater than 0
    expect(previousYearValue, 'Previous year value should be greater than 0').toBeGreaterThan(0);
    expect(currentYearValue, 'Current year value should be greater than 0').toBeGreaterThan(0);
    expect(yearDifferenceValue, 'Year difference value should be greater than 0').toBeGreaterThan(0);
    
    // Verify the difference calculation
    const calculatedDifference = currentYearValue - previousYearValue;
    const tolerance = 0.01; // Small tolerance for floating point comparison
    
    expect(
      Math.abs(yearDifferenceValue - calculatedDifference) < tolerance,
      `Year difference value ${yearDifferenceValue} should equal current year - previous year (${calculatedDifference})`
    ).toBeTruthy();
    
    console.log("All year data verified successfully");
    
    // 3. Switch to table view 
    await dashboardPage.switchToTableView();
    await page.waitForTimeout(2000); // Extra wait to see the view
    console.log("Switched to table view");
    
    // 4. Switch to chart view
    await dashboardPage.switchToChartView();
    await page.waitForTimeout(2000); // Extra wait to see the view
    console.log("Switched to chart view");
    
    // 5. Switch back to table view for comparison
    await dashboardPage.switchToTableView();
    await page.waitForTimeout(2000); // Extra wait to see the view
    console.log("Switched back to table view");
    
    // Final verification that switching views doesn't affect the data
    const newYearDifferenceData = await dashboardPage.getYearDifferenceData();
    const newYearDifferenceValue = dashboardPage.convertDollarToNumber(newYearDifferenceData);
    
    // Verify the data is still consistent after view switching
    expect(
      newYearDifferenceValue,
      'Year difference value should remain consistent after view switching'
    ).toBeCloseTo(yearDifferenceValue, 2); // Compare with 2 decimal precision
    
    console.log("View switching test completed successfully");
  });
}); 