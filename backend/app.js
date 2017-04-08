var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require('body-parser');

var schools = [];
function school(name, lon, lat, contactName, contactNumber, imagePaths){
    this.name = name;
    this.lon = lon;
    this.lat = lat;
    this.contactName = contactName;
    this.contactNumber = contactNumber;
    this.imagePaths = imagePaths;
}

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'));
app.use('/static', express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/database', function(req, res){
    console.log("dump requested");
    var jsonAry = [];
    if(schools.length == 0){
        res.end("database empty");  
        return;
    }
    
    for(var i =0; i < schools.length; i++){
        jsonAry.push(buildSchoolJson(schools[i]));
    }
    console.log("response built");
    res.setHeader('Content-Type', 'application/json');
    res.end(jsonAry.toString());
});

app.get('/search', function(req,res){
    var searchName = require('url').parse(req.url,true).query.name;
    
    var school = searchSchool(searchName);
    if(school == -1){
        console.log("school not found");
        res.end("null");
    }else{
        console.log("found, returning data");
        res.setHeader('Content-Type', 'application/json');
        res.end(buildSchoolJson(school));
    }
});

function buildSchoolJson(school){
    var json = JSON.stringify({
        name: school.name,
        lon: school.lon,
        lat: school.lat,
        contactName: school.contactName,
        contactNumber: school.contactNumber,
        imagePaths: school.imagePaths
    });
    return json;
}

function searchSchool(name){
    for(var i = 0; i < schools.length; i++){
        if(schools[i].name === name ){
            return schools[i];       
           
        }
    }
    return -1;
}

app.post('/upload', function(req, res){
  // create an incoming form object
    var fields = [];
    var form = new formidable.IncomingForm();
    //console.log(form);

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/public/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
    var fileNum = 0;
  form.on('file', function(field, file) {
      fileNum++;
      console.log("reading file");
      console.log(fields["name"]);
      fs.rename(file.path, path.join(form.uploadDir, fields["name"]+"_"+fileNum.toString()+".jpg"));
      
  });
    
    console.log("start reading fields");

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    buildSchool(fields, fileNum);
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
    console.log("starting reading");
    
  form.on('field', function (field, value){
      console.log(field);
      console.log(value);
      fields[field] = value;
  });  
    
});

function buildSchool(fields, fileNum){
    var newSchool = new school(fields["name"], fields["lon"], fields["lat"], fields["contact"], fields["contactNum"], fileNum);
    schools.push(newSchool);
    console.log("school built");
    console.log(schools);
}

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
