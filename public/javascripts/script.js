document.addEventListener("DOMContentLoaded", function(event) {
    var formElement = document.getElementById("parameters-form"),
        previewElement = document.getElementById("preview-div");

    formElement.addEventListener('change', function(event){
        var str = $(formElement).serialize();
        previewElement.innerHTML=location.origin.concat('/puppet-show/print?').concat(str);
    });
});
