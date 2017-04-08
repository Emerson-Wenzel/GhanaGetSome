$('#submit').on('click', function(event){
    event.preventDefault();
    console.log('processing onclick');
    var files = $('#upload-input').get(0).files;
    
    var formData = new FormData();
    formData.append("name", $('#name').val());
    formData.append("lon", $('#lon').val());
    formData.append("lat", $('#lat').val());
    formData.append("contact", $('#contact').val());
    formData.append("contactNum", $('#contactNum').val());


    console.log(formData);
    if (files.length > 0){
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      
      var file = files[i];
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: 'http://localhost:3000/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!\n' + data);
      }
    });

  } 
});

$('#searchButton').on('click', function(){
    console.log("processing search");
    var formData = new FormData();
    formData.append("name", $('#search').val());
    console.log($('#search').val());
    console.log(formData);

    
    $.ajax({
        url: 'http://localhost:3000/search/',
        data: {'name' : $('#search').val()},
        type: 'GET',
        dataType: "json",
        success: function(data){
            console.log("search complete");
            console.log(data);
        }
    }); 
})

