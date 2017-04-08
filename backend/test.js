$(document).ready(function(){
    $.ajax({
        url: 'http://127.0.0.1:8081/',
        dataType: "jsonp",
        jsonpCallback: "_testcb",
        cache: false,
        timeout: 5000,
        success: function(data){
            console.log("success");
            console.log(data);
        }
    });
});