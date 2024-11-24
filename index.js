// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { title } = require("process");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  await page.waitForTimeout(5000);
  
  // retrieve the class to get access to the date of each article
  // const articleDate = await page.$$eval('.subline', articles => {
  //   const data = []
  //   articles.forEach(article => {
  //     const aDate = article.querySelector('.age')
  //     const date = aDate ? aDate.title: null;
  //     data.push({date})
  //   })
  //   return data
  // })
  
  // const articleTitle = await page.$$eval('.title', articles => {
  //   const data = []
  //   articles.forEach(article => {
  //     const aTitle = article.querySelector('.titleline > a')
  //     const title = title ? aTitle.title: null;
  //     data.push({title})
  //   })
  //   return data
  // })
    
  // dates = articleDate
  // titles = articleTitle
  // console.log(dates)
  // console.log(titles)
  // const articleAges = page.waitForSelector('.age')

  // getting all the article dates
  const articleAges = await page.$$eval('.subline > .age', ages => {
    return ages.map(age => age.getAttribute('title'))
  })
  
  // getting all the article titles
  const articleTitles = await page.$$eval('.titleline > a', anchors => {
    return anchors.map(anchor => ({
      title: anchor.innerText,
      url: anchor.href
    }))
  })

  // const articleIDs = await page.$$eval('.subline > .age > a', link)

  // combining each article's date, id, and title

  console.log(articleAges)
  console.log(articleTitles)
  await browser.close();  
}

(async () => {
  await sortHackerNewsArticles();
})();

