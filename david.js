var webdriver = require('selenium-webdriver');
//var Asserts = require('asserts');

var userName = "tejaswatamwar2";
var accessKey = "wKTHxDCe9LQvTLZCzobW"
var browserstackURL = 'https://' +  userName + ':' + accessKey + '@hub-cloud.browserstack.com/wd/hub';

const {
	Assert,
    Builder,
    By,
    Key,
    until
} = require("selenium-webdriver")

// Input capabilities
var capabilities = {
  
  'browserstack.local' : false, //or false
  'acceptSslCerts' : true,
  'browserstack.idleTimeout': '30',
  'browserstack.localIdentifier': 'test123',
  'os' : 'Windows',
  'os_version' : '10',
  'browserName' : 'Chrome',
  'browser_version' : '80',
  'name' : "CE_main_logo_magento.js - log in, click user icon then My Account"
}

var driver = new webdriver.Builder().
  usingServer(browserstackURL).
  withCapabilities(capabilities).
  build();
  
  //error using By.xpath, learned that local testing needs to be turned on - see https://www.browserstack.com/local-testing/app-automate
  //install win or osX binary

async function chrome_log_in_david12() {
		await driver.get("https://www.continuingeducation.com"); //PROD
		//await driver.navigate().to("https://www.yahoo.com"); //just testing, yes it does go to yahoo
		//await driver.get("https://qa-store.continuingeducation.com"); //QA
		
		//LOG IN
		await driver.findElement(By.css(".nav-login button")).click(); //click Login ICON
		await driver.findElement(By.css('.popover-body .login-mobile')).click(); //click Log In link
		await driver.findElement(By.css('.modal .login-form')).click(); //click on modal to get to inner fields, add email address, add password, press return
		await driver.findElement(By.css('.modal .login-form input[name="j_username"]')).sendKeys("dcparham@gmail.com");
		await driver.findElement(By.css('.modal .login-form input[name="j_password"]')).sendKeys("Testing1!", Key.RETURN);

		//MY ACCOUNT
		//await driver.findElement(By.css('body > div.root.responsivegrid > div > div.header.aem-GridColumn.aem-GridColumn--default--12 > section > div.container.header-analytics > div > div.col-6.col-xl-7.text-uppercase.header__links--wrapper.header-spacer > div > div.col-auto.authorised-user > button > img')).click(); //click User icon [.header-icon belongs to multiple elements]
		await driver.findElement(By.css(".nav-login button")).click(); //click Login ICON - @@@@@@@@ LAST WORKING COMMAND @@@@@@@@
		//await driver.findElement(By.linkText("My Account")).click(); //unable to locate element
		//await driver.findElement(By.xpath("//a[@title='My Account']")).click(); //element is not interactable
		await driver.findElement(By.xpath("/html/body/div[9]/div[2]/div/div/a[1]")).click(); //element is not interactable
		//await clickElementWhenAppears(driver, "//a[@href='https://store.continuingeducation.com/customer/account/index']"); //click intercepted
		//await clickElementWhenAppears(driver, '.fade > div:nth-of-type(2) > div > div > a[href="https://store.continuingeducation.com/customer/account/index"].d-block.header__links'); //click intercepted
		//driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS); 
		//await driver.findElement(By.css('div > a[href="https://store.continuingeducation.com/customer/account/index"]')).click(); //click My Account - unable to locate element
		//await driver.findElement(By.css('a.text="My Account')).click(); //click My Account - unable to locate element
		//await clickElementWhenAppears(driver, "body > div.root.responsivegrid > div > div.header.aem-GridColumn.aem-GridColumn--default--12 > section > div.container.header-analytics > div > div.col-6.col-xl-7.text-uppercase.header__links--wrapper.header-spacer > div > div.col-auto.authorised-user > button > img");
		//await driver.wait(until.elementLocated(By.css('body > div.root.responsivegrid > div > div.header.aem-GridColumn.aem-GridColumn--default--12 > section > div.container.header-analytics > div > div.col-6.col-xl-7.text-uppercase.header__links--wrapper.header-spacer > div > div.col-auto.authorised-user > button > img')), 5*1000).then(el => { return el.click(); });
		//await driver.findElement(By.css('.col-auto.authorised-user')).click(); //click user icon - not interactible
		//await driver.findElement(By.css('.col-auto.authorised-user')).click(); //click user icon - no such element
		//await driver.findElement(By.css('.fa .fa-chevron-down .d-none .d-md-inline-bloc')).click(); //click user icon - no such element
		
		//no need to click My Account bc it's not found on the page? if you scroll via F12 element code. so just nav to My Account;
		//await clickElementWhenAppears(driver, "body > div.root.responsivegrid > div > div.header.aem-GridColumn.aem-GridColumn--default--12 > section > div.container.header-analytics > div > div.col-6.col-xl-7.text-uppercase.header__links--wrapper.header-spacer > div > div.col-auto.authorised-user > button > img");
		
		//await driver.navigate().to("https://store.continuingeducation.com/customer/account/index");
		//await driver.findElement(By.css('.logo')).click();
		
		//await driver.assertEquals(driver.getCurrentUrl(), "https://store.continuingeducation.com/customer/account/index" );

		//await driver.findElement(By.linkText("My Account")).click(); //not work
		//await driver.findElement(By.css("div>a[href*='https://store.continuingeducation.com/customer/account/index']")).click();
		//await clickElementWhenAppears(driver, "div>a[href*='https://store.continuingeducation.com/customer/account/index']");
		//await clickElementWhenAppears(driver, "div > a[text()='App Configuration']");
		//await clickElementWhenAppears(driver, ".d-none .popover__body .login-popover-content");
		//await clickElementWhenAppears(driver, "div>a[data-analyticstitle='Login- My Account']");
		//await driver.findElement(By.css(".d-none .popover__body .login-popover-content")).click();

}

async function clickElementWhenAppears(driver, selector, timeout=5000){
	executeFunctionWhenElementAppears(driver, selector, function(el){ el.click(); }, timeout);
}

async function executeFunctionWhenElementAppears(driver, selector, fn, timeout){
	let by = By.css(selector);
	driver.wait(until.elementLocated(by, timeout));
	let el = driver.findElement(by);
    await driver.wait(until.elementIsVisible(el), timeout).then(fn); //click Log In link - that took HOURS, figuring out to remove that.
}
	
	/* driver.get('https://www.continuingeducation.com').then(function(){
		driver.findElement(webdriver.By.xpath("/html/body/div[1]/div/div[1]/section/div[3]/div/div[2]/div/div[3]/div[2]/div/button/img")).click().then(function() { //login ICON
			driver.findElement(webdriver.By.css('#popover911785 > div.popover-body > div > div.d-lg-none.popover__body--mobile > button')).click().then(function(){ //login LINK
				driver.findElement(webdriver.By.css('#modalloginEmail')).sendKeys("dcparham@gmail.com").then(function(title) {
					driver.findElement(webdriver.By.css('#modalloginPassword')).sendKeys("Testing1!").then(function(title) {
						driver.findElement(webdriver.By.css('#modalsignIn')).click();
					});
				});
			});
		});
	
	}); */
	
chrome_log_in_david12();
//chrome_log_in_david12().then(function() { driver.quit() });
	
  