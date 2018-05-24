document.addEventListener("DOMContentLoaded", function(event) {
    var formElement = document.getElementById("parameters-form"),
        previewElement = document.getElementById("preview-div"),
        formatElement = document.getElementById("format"),
        customElement = document.getElementById("custom");

    var updatePreview = function(event){
        var str = $(formElement).serialize();
        previewElement.innerHTML=location.origin.concat('/puppet-show/pdf?').concat(str);
        
        if(formatElement.value === 'custom') {
            customElement.style.display = "table-row";
        } else {
            customElement.style.display = "none";
        }
    };

    formElement.addEventListener('change', updatePreview);

    formElement.addEventListener('keyup', updatePreview);

    formElement.dispatchEvent(new Event('change'));
});
