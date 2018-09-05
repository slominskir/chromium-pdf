document.addEventListener("DOMContentLoaded", function (event) {
    var pdfForm = document.getElementById("pdf-form"),
            screenshotForm = document.getElementById("screenshot-form"),
            pdfPreview = document.getElementById("pdf-preview-div"),
            screenshotPreview = document.getElementById("screenshot-preview-div"),
            formatElement = document.getElementById("format"),
            customElement = document.getElementById("custom");

    var updatePdfPreview = function (event) {
        var str = $(pdfForm).serialize();
        pdfPreview.innerHTML = location.origin.concat('/puppet-show/pdf?').concat(str);

        if (formatElement.value === 'custom') {
            customElement.style.display = "table-row";
        } else {
            customElement.style.display = "none";
        }
    };

    var updateScreenshotPreview = function (event) {
        var str = $(screenshotForm).serialize();
        screenshotPreview.innerHTML = location.origin.concat('/puppet-show/screenshot?').concat(str);
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
        
        if('screenshot' === hash) {
            screenshotLink.dispatchEvent(new Event('click'));
        }
    }
});
