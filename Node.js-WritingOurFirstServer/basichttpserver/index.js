const http=require('http');
const port=8000;
const fs= require('fs'); //reads or writes files  (module)

function requestHandler(request,response){
    console.log(request.url);
    response.writeHead(200,{'content-type':'text/html'});
    fs.readFile('./index.html',function(error,data){
        if(error){
            console.log('error',error);
            return response.end('<h1>Error!</h1>');
        }
        return response.end(data);
    });

    // response.end('<h1>Gotcha!</h1>');
}
const server=http.createServer(requestHandler);

server.listen(port,function(error){
        if(error){
            console.log('error',error);
            return;
        }

        console.log('Server is up and running on port:',port);
});