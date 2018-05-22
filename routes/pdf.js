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
            scale = req.query.scale || 1.0,
            media = req.query.emulateMedia || 'print',
            pageRanges = req.query.pageRanges || '';

        scale = parseFloat(scale);
        /*Ensure floating point value*/

        try {
            var browser = await
            puppeteer.launch(),
                page = await
            browser.newPage();

            await page.goto(url, {waitUntil: 'networkidle2'});
            page.emulateMedia(media);
            var buffer = await page.pdf({
                printBackground: printBackground,
                format: format,
                landscape: landscape,
                margin: {top: top + units, right: right + units, bottom: bottom + units, left: left + units},
                scale: scale,
                pageRanges: pageRanges
            });

            res.setHeader('content-type', 'application/pdf');
            res.setHeader('content-disposition', 'attachment; filename="html.pdf"');
            res.send(buffer);

            await browser.close();
        } catch(error) {
            next(createError(400, error));
        }
    })();
});

module.exports = router;
