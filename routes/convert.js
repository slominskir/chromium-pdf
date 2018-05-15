var puppeteer = require('puppeteer'),
express = require('express'),
router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    (async() => {
        var url = req.query.url,
        landscape = req.query.orientation === 'landscape',
        units = req.query.units || 'in',
        top = req.query.top || '1',
        right = req.query.right || '1',
        bottom = req.query.bottom || '1',
        left = req.query.left || '1',
        scale = req.query.scale || 1.0;

        scale = parseFloat(scale); /*Ensure floating point value*/

        var browser = await puppeteer.launch(),
        page = await browser.newPage();

        await page.goto(url, {waitUntil: 'networkidle2'});
        var buffer = await page.pdf({printBackground: true, landscape: landscape, margin: {top: top + units, right: right + units, bottom: bottom + units, left: left + units}, scale: scale});

        res.setHeader('content-type', 'application/pdf');
        res.setHeader('content-disposition', 'attachment; filename="html.pdf"');
        res.send(buffer);

        await browser.close();
    })();
});

module.exports = router;
