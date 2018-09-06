document.addEventListener("DOMContentLoaded", function (event) {
    var pdfForm = document.getElementById("pdf-form"),
            screenshotForm = document.getElementById("screenshot-form"),
            pdfPreview = document.getElementById("pdf-preview-div"),
            screenshotPreview = document.getElementById("screenshot-preview-div"),
            formatElement = document.getElementById("format"),
            customElement = document.getElementById("custom");

    var defaultPdfOptions = {
        format: 'Letter',
        landscape: 'false',
        height: '8.5in',
        width: '11in',
        top: '0in',
        right: '0in',
        bottom: '0in',
        left: '0in',
        scale: '1',
        displayHeaderFooter: 'false',
        printBackground: 'false',
        emulateMedia: 'print',
        ignoreHTTPSErrors: 'false'
    };

    var updatePdfPreview = function (event) {
        var str = $(pdfForm).find(":input").filter(function (index, element) {
            var $elem = $(element),
                    val = $elem.val(),
                    result = val !== '';
            if (result) {
                var name = $elem.attr('name'),
                        value = defaultPdfOptions[name];
                if (defaultPdfOptions.hasOwnProperty(name)) {
                    result = value !== val;
                }
            }
            return result;
        }).serialize();
        
        var q = (str === '' ? '' : '?');
        
        pdfPreview.innerHTML = location.origin.concat('/puppet-show/pdf').concat(q).concat(str);        

        if (formatElement.value === 'custom') {
            customElement.style.display = "table-row";
        } else {
            customElement.style.display = "none";
        }
    };

    var defaultScreenshotOptions = {
        type: 'png',
        fullPage: 'false',
        viewportWidth: '800',
        viewportHeight: '600',
        deviceScaleFactor: '1',
        encoding: 'binary',
        omitBackground: 'true',
        emulateMedia: 'print',
        ignoreHTTPSErrors: 'false'
    };

    /*filter out empty and default values*/
    var updateScreenshotPreview = function (event) {
        var str = $(screenshotForm).find(":input").filter(function (index, element) {
            var $elem = $(element),
                    val = $elem.val(),
                    result = val !== '';
            if (result) {
                var name = $elem.attr('name'),
                        value = defaultScreenshotOptions[name];
                if (defaultScreenshotOptions.hasOwnProperty(name)) {
                    result = value !== val;
                }
            }
            return result;
        }).serialize();
        
        var q = (str === '' ? '' : '?');
        
        screenshotPreview.innerHTML = location.origin.concat('/puppet-show/screenshot').concat(q).concat(str);
    };

    pdfForm.addEventListener('change', updatePdfPreview);
    pdfForm.addEventListener('keyup', updatePdfPreview);
    pdfForm.dispatchEvent(new Event('change'));

    screenshotForm.addEventListener('change', updateScreenshotPreview);
    screenshotForm.addEventListener('keyup', updateScreenshotPreview);
    screenshotForm.dispatchEvent(new Event('change'));

    var pdfLink = document.getElementById("pdf-link"),
            screenshotLink = document.getElementById("screenshot-link"),
            pdfContent = document.getElementById("pdf-content"),
            screenshotContent = document.getElementById("screenshot-content");
    pdfLink.addEventListener("click", function (event) {
        screenshotContent.style.display = 'none';
        pdfContent.style.display = 'block';

        screenshotLink.classList.remove('current-primary');
        pdfLink.classList.add('current-primary');
    });

    screenshotLink.addEventListener("click", function (event) {
        screenshotContent.style.display = 'block';
        pdfContent.style.display = 'none';

        screenshotLink.classList.add('current-primary');
        pdfLink.classList.remove('current-primary');
    });

    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        if ('screenshot' === hash) {
            screenshotLink.dispatchEvent(new Event('click'));
        }
    }
});
