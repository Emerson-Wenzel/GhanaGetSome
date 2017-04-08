console.log('Server running at http://127.0.0.1:8081/');
var http = require("http");

//global variables & classes
var schools = [];
function school(name, lon, lat, contactName, contactNumber, imagePaths){
    this.name = name;
    this.lon = lon;
    this.lat = lat;
    this.contactName = contactName;
    this.contactNumber = contactNumber;
    this.imagePaths = imagePaths;
}

http.createServer(function (request, response){
    console.log('request recieved');
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.end('_testcb(\'{"message": "Hello world!"}\')');
    
}).listen(8081);


