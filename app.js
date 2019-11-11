const express = require('express');
const app = express();
const articleReq = require('./utils/article-req');
const addReq = require('./utils/additional-req');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts',express.static(path.join(__dirname, 'public/scripts')));
app.use('/styles',express.static(path.join(__dirname, 'public/styles')));

app.get('/articles/:page', async (req, res) => {
    try {
        if (!isNaN(+req.params.page) || +req.params.page > 0) {
            let data = await articleReq(+req.params.page);
            let addData = await addReq();
            let articles = [];
            let addContent = [];
            for(let i = 0; i < data.listOfTitles.length; i++) {
                articles.push({
                    image: data.listOfImages[i],
                    title: data.listOfTitles[i],
                    url: data.listOfURLs[i],
                    content: data.listOfContent[i],
                });
            }
            for (let i = 0; i < addData.listOfTitles.length; i++) {
                addContent.push({
                    image: addData.listOfImages[i],
                    title: addData.listOfTitles[i],
                    url: addData.listOfURLs[i],
                });
            }
            res.render('main', {articles, addContent, currentPage: +req.params.page});
        } else {
            throw new Error('Incorrect page number');
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = app;
