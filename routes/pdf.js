var createError = require('http-errors'),
puppeteer = require('puppeteer'),
express = require('express'),
router = express.Router();

router.get('/', function(req, res, next) {
        (async() => {
            var url = req.query.url,
            format = req.query.format || 'Letter',
            landscape = req.query.landscape === 'true',
            units = req.query.units || 'in',
            top = req.query.top || '1',
            right = req.query.right || '1',
            bottom = req.query.bottom || '1',
            left = req.query.left || '1',
            printBackground = req.query.printBackground === 'true',
            displayHeaderFooter = req.query.displayHeaderFooter === 'true',
            headerTemplate = req.query.headerTemplate || null,
            footerTemplate = req.query.footerTemplate || null,
            scale = req.query.scale || 1.0,
            media = req.query.emulateMedia || 'print',
            pageRanges = req.query.pageRanges || '',
            ignoreHTTPSErrors = req.query.ignoreHTTPSErrors === 'true',
            filename = req.query.filename || null,
            waitUntil = req.query.waitUntil,
            waitForSelector = req.query.waitForSelector || null;

        /*Ensure floating point value*/
        scale = parseFloat(scale);

        try {
            var browser = await puppeteer.launch({ignoreHTTPSErrors: ignoreHTTPSErrors}),
                page = await browser.newPage();

            await page.goto(url, {waitUntil: waitUntil});

            if(waitForSelector !== null) {
                await page.waitForSelector(waitForSelector);
            }

            page.emulateMedia(media);

            var options = {
                printBackground: printBackground,
                displayHeaderFooter: displayHeaderFooter,
                format: format,
                landscape: landscape,
                margin: {top: top + units, right: right + units, bottom: bottom + units, left: left + units},
                scale: scale,
                pageRanges: pageRanges
            };

            if(headerTemplate !== null) {
                options.headerTemplate = headerTemplate;
            }

            if(footerTemplate !== null) {
                options.footerTemplate = footerTemplate;
            }

            var buffer = await page.pdf(options);

            res.setHeader('content-type', 'application/pdf');

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
