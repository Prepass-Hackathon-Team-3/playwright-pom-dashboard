import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { testUrls, expectedTexts, testData } from '../fixtures/testData';

test.describe('Dashboard Functionality', () => {
  let dashboardPage;

  // Before each test, navigate to the dashboard
  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToDashboard(testUrls.baseUrl);
    
    // Verify we're on the dashboard before continuing
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
  });

  test('should display dashboard correctly', async () => {
    // No need to navigate again - already done in beforeEach
    
    // Assert
    const dashboardTitle = await dashboardPage.getDashboardTitle();
    expect(dashboardTitle).toContain(expectedTexts.dashboardTitle);
  });
  
  test('should display correct number of dashboard cards', async () => {
    // No need to navigate again - already done in beforeEach
    
    // Assert
    const cardCount = await dashboardPage.getCardCount();
    expect(cardCount).toBe(testData.cardExpectedCount);
  });
  
  test('should search and find results', async () => {
    // No need to navigate again - already done in beforeEach
    
    // Act
    await dashboardPage.searchDashboard(testData.searchTerms.valid);
    
    // Assert
    const cardCount = await dashboardPage.getCardCount();
    expect(cardCount).toBeGreaterThan(0);
  });
  
  test('should search and show no results message', async ({ page }) => {
    // No need to navigate again - already done in beforeEach
    
    // Act
    await dashboardPage.searchDashboard(testData.searchTerms.noResults);
    
    // Assert
    const noResultsMessage = await page.textContent('.no-results-message');
    expect(noResultsMessage).toContain(expectedTexts.noResultsMessage);
  });
}); 