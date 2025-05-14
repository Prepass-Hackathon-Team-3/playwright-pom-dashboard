import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  // Element selectors
  private dashboardHeader = 'h1.dashboard-title';
  private userProfileButton = '[data-testid="user-profile"]';
  private logoutButton = '[data-testid="logout-button"]';
  private dashboardCards = '.dashboard-card';
  private notificationBell = '[data-testid="notifications"]';
  private searchInput = 'input[placeholder="Search"]';
  private settingsButton = '[data-testid="settings"]';
  
  /**
   * Navigate to the dashboard page using relative URL
   */
  async navigateToDashboard(): Promise<void> {
    await this.navigate('/dashboard');
  }
  
  /**
   * Check if dashboard is displayed
   */
  async isDashboardVisible(): Promise<boolean> {
    return await this.page.isVisible(this.dashboardHeader);
  }
  
  /**
   * Get the dashboard title text
   */
  async getDashboardTitle(): Promise<string> {
    return await this.page.textContent(this.dashboardHeader) || '';
  }
  
  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    await this.page.click(this.userProfileButton);
    await this.page.click(this.logoutButton);
    await this.waitForPageLoad();
  }
  
  /**
   * Get count of dashboard cards
   */
  async getCardCount(): Promise<number> {
    return await this.page.locator(this.dashboardCards).count();
  }
  
  /**
   * Search for content on the dashboard
   */
  async searchDashboard(searchTerm: string): Promise<void> {
    await this.page.fill(this.searchInput, searchTerm);
    await this.page.press(this.searchInput, 'Enter');
    await this.waitForPageLoad();
  }
  
  /**
   * Open notifications panel
   */
  async openNotifications(): Promise<void> {
    await this.page.click(this.notificationBell);
  }
  
  /**
   * Open settings page
   */
  async openSettings(): Promise<void> {
    await this.page.click(this.settingsButton);
    await this.waitForPageLoad();
  }
} 