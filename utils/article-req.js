const puppeteer = require('puppeteer');

const articleRequest = async (pageNumber) => {
    try {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.resourceType() === 'image' ||
                request.resourceType() === 'stylesheet' ||
                request.resourceType() === 'font') {
                request.abort();
            } else {
                request.continue();
            }
        });
        await page.goto(`http://www.psychologies.ru/articles/${pageNumber}`);
        await page.waitForSelector("div.razdel-section");
        let listOfTitles = await page.$$eval('.rubric-anons_title' , content => content.map(title => title.innerText));
        let listOfURLs = await page.$$eval('.rubric-anons_title' , content => content.map(url => url.href));
        let listOfContent = await page.$$eval('.rubric-anons_text' , content => content.map(text => text.innerText));
        // await browser.close();

        return {listOfTitles, listOfURLs, listOfContent};
    } catch (e) {
        console.log(e)
    }
};

module.exports = articleRequest;
