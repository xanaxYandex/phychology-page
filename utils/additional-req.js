const puppeteer = require('puppeteer');

const addReq = async () => {
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
        await page.goto(`http://www.psychologies.ru`);
        await page.waitForSelector("ul.topic-list");
        const listOfImages = await page.$$eval('.image' , content => content.map(image => image.src));
        const listOfTitles = await page.$$eval('.text' , content => content.map(title => title.innerText));
        const listOfURLs = await page.$$eval('.link' , content => content.map(url => url.href));
        await browser.close();

        return {listOfImages, listOfTitles, listOfURLs};
    } catch (e) {
        console.log(e)
    }
};

module.exports = addReq;
