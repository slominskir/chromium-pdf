document.addEventListener("DOMContentLoaded", function(event) {
    var formElement = document.getElementById("parameters-form"),
        previewElement = document.getElementById("preview-div");

    var updatePreview = function(event){
        var str = $(formElement).serialize();
        previewElement.innerHTML=location.origin.concat('/puppet-show/print?').concat(str);
    };

    formElement.addEventListener('change', updatePreview);

    formElement.addEventListener('keyup', updatePreview);

    formElement.dispatchEvent(new Event('change'));
});
