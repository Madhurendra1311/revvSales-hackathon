const puppeteer = require('puppeteer');
const express = require('express');
var bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post('/screenshot', async (req, res) => {
  //opens the browser
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  //loads the url
  await page.goto('https://auth.revvsales.com/signin');

  //authentication
  await page.type('#signin-email-field', req.body.email);
  await page.click('#signin-email-continue-btn');
  await page.waitForTimeout(2000)
  await page.type('#signin-password-field', req.body.password);

  //navigating to landing page
  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click('#signin-button-field'), // Clicking the link will indirectly cause a navigation
  ]);

  //navigating to the document editing page
  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.goto('https://ft392m2a.revvsales.com/documents/DOC-000020'), // Clicking the link will indirectly cause a navigation
  ]);
  await page.waitForTimeout(2000);   
  
  //entering values in the form fields 
  await page.focus('.revv-inp')
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  

  await page.keyboard.type('masai', {delay: 100})
  await page.keyboard.press('Tab')

  await page.keyboard.type('school', {delay: 100})
  await page.keyboard.press('Tab')

  await page.keyboard.type('2500', {delay: 100})

  await page.waitForTimeout(2000); 

  //taking screenshot of the page
  await page.screenshot({path: 'login.png'});

  //close the browser. now with the help of doc_no, doc_id and object_id, you can create a magic link of the document using revvsales api's
  await browser.close();
  res.json({"name":"babu"})
})
console.log(process.env.PORT)
app.listen(process.env.PORT)