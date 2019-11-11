require('marko/node-require').install();
const app = require('express')();
const articleReq = require('./utils/article-req');

app.get('/articles/:page', module.exports = async (req, res) => {
    try {
        if (!isNaN(+req.params.page) || +req.params.page > 0) {
            let data = await articleReq(+req.params.page);
            let result = [];
            for(let i = 0; i < data.listOfTitles.length; i++) {
                result.push({
                    title: data.listOfTitles[i],
                    url: data.listOfURLs[i],
                    content: data.listOfContent[i],
                });
            }
            //res.json(result);
            template.render(result, res);
        } else {
            throw new Error('Debil');
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = app;
