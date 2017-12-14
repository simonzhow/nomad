const {
  Builder, By, Key,
} = require('selenium-webdriver')

const driver = new Builder()
  .forBrowser('safari')
  .build()

// Test Case for Login
driver.get('http:localhost:8000/')
driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
driver.quit()
