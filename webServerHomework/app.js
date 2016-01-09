(function(){
    'use strict'
    var http = require('http'),
        path = require('path'),
        url = require('url'),
        qs = require('querystring'),
        fs = require('fs'),
        Busboy = require('busboy'),
        guid = require('guid');

    var filenames = {};


    //Getting the filetype...
    function getType(name){
        var arr = name.split(''),
        i = arr.length - 1,
        type = '';

        for(i; i >= 0; i--){
            if(arr[i] !== '.'){
                type = arr[i] + type;
            } else {
                type = '.' + type;
                break;
            }
        }
        return type;
    }

    http.createServer(function (req, res) {
        var reqUrl = url.parse(req.url, true);
        var reqPath = reqUrl.pathname;
        var query = reqUrl.query;
        var response = '';

        if (req.method === 'POST') {
            var uploadFileName;
            var busboy = new Busboy({
                headers: req.headers
            });
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                uploadFileName = guid.raw() + getType(filename);
                file.pipe(fs.createWriteStream('./public/files/' + uploadFileName));
            });
            busboy.on('finish', function () {
                res.writeHead(200, {
                    'Connection': 'close'
                });
                response = fs.readFileSync('./public/partials/header.html') +
                           '<h3>Upload successfull!</h3>' +
                           '<a href="download?fileGuid=' + uploadFileName + '">Download your file</a>' +
                           fs.readFileSync('./public/partials/footer.html');
                res.end(response);
            });
            return req.pipe(busboy);
        } else if (reqPath === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response = fs.readFileSync('./public/partials/header.html') +
                       fs.readFileSync('./public/partials/upload.html') +
                       fs.readFileSync('./public/partials/footer.html');
            res.end(response);
        } else if (reqPath === '/download') {
            var fileGuid = query.fileGuid;
            var filePath = path.join(__dirname, '/public/files/', query.fileGuid);
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Length': stat.size,
                'Content-Disposition': 'attachment; filename=' + fileGuid
            });

            var readStream = fs.createReadStream(filePath);
            readStream.on('open', function () {
                readStream.pipe(res);
            });
        } else {
            res.writeHead(404);
            res.end('<h1>Internal server error</h1>');
        }

    }).listen(8080, function () {
        console.log('Listening on port 8080');
    });
}());
