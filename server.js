// defining variables +importing node modules
const http = require('http'),
fs = require('fs'),
url = require('url');

http.createServer((request, response) => {
  //parsing the url request and asing it to addr var
  var req = request.url,
  query = url.parse(req, true),
  filePath = '';
// this uses an if statement if the url contains documentation it will take to that documentation page
//otherwise it will direct you to index.html
  if (query.pathname.includes('documentation')){
    filePath = (__dirname + '/documentation.html');
  }else {
    filePath = 'index.html';
  }
// this will access the log.txt and make sure therea are no issues, otherwise will populate with a header and pass in the data
  fs.readFile(filePath, function(err,data){
    if (err){
      throw err;
    }
    response.writeHead(200,{'Content-Type': 'text/html'});
    response.write(data);
    response.end();
  });
// this will print in the log file time, + url requested
  fs.appendFile('log.txt', 'URL: ' + req + '\nTimeStamp: ' + new Date() + '\n\n', function(err) { 
    if(err){
    console.log(err);
  } else {
    console.log ('added to log')
  }
})
}).listen(8080)

