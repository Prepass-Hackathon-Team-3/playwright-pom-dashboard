const { chromium } = require('@playwright/test');

(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Navigating to the Azure URL...');
  
  // Navigate to the specified URL
  await page.goto('https://black-mud-0cf938c10.6.azurestaticapps.net/');
  
  console.log('Page loaded, waiting for 30 seconds so you can see it...');
  
  // Wait for 30 seconds so you can see the page
  await new Promise(resolve => setTimeout(resolve, 30000));
  
  console.log('Done! Closing browser.');
  
  // Close the browser
  await browser.close();
})(); 