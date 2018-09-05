var createError = require('http-errors'),
puppeteer = require('puppeteer'),
express = require('express'),
router = express.Router();

router.get('/', function(req, res, next) {
        (async() => {
            var url = req.query.url,
            type = req.query.type || 'png',
            quality = req.query.quality || null,
            fullPage = req.query.fullPage === 'true',
            clipX = req.query.clipX || null,
            clipY = req.query.clipY || null,
            clipWidth = req.query.clipWidth || null,
            clipHeight = req.query.clipHeight || null,
            omitBackground = req.query.omitBackground === 'true',
            encoding = req.query.encoding || 'binary',
            media = req.query.emulateMedia || 'print',
            ignoreHTTPSErrors = req.query.ignoreHTTPSErrors === 'true',
            filename = req.query.filename || null,
            waitUntil = req.query.waitUntil,
            waitForSelector = req.query.waitForSelector || null;

        try {
            var browser = await puppeteer.launch({ignoreHTTPSErrors: ignoreHTTPSErrors}),
                page = await browser.newPage();

            await page.goto(url, {waitUntil: waitUntil});

            if(waitForSelector !== null) {
                await page.waitForSelector(waitForSelector);
            }

            page.emulateMedia(media);

            var options = {
                type: type,
                fullPage: fullPage,
                omitBackground: omitBackground,
                encoding: encoding
            };
            
            if(quality !== null) {
                options.quality = parseInt(quality);
            }
            
            if(clipX !== null && clipY !== null && clipWidth !== null && clipHeight !== null) {
                options.clip = {x: parseFloat(clipX), y: parseFloat(clipY), width: parseFloat(clipWidth), height: parseFloat(clipHeight)};
            }

            var buffer = await page.screenshot(options);

            var mimeType = 'image/png';

            if('jpeg' === type) {
                mimeType = 'image/jpeg';
            }

            if('base64' === encoding) {
                mimeType = 'application/base64';
            }

            res.setHeader('content-type', mimeType);

            if(filename !== null) {
                res.setHeader('content-disposition', 'attachment; filename="' + filename + '"');
            }

            res.send(buffer);

            await browser.close();
        } catch(error) {
            next(createError(425, error));
        }
    })();
});

module.exports = router;
