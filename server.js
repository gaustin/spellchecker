var sys = require('sys'),
    fs = require('fs'),
    http = require('http'),
    parse = require('url').parse,
    speller = require('./vendor/speller'),
    correct = speller.correct;

// Train the speller on startup
speller.train(fs.readFileSync('./vendor/corpus/base.data'));

http.createServer(function (request, response) {
    var uri = parse(request.url, true),
        word = uri.query && uri.query.word ? uri.query.word : null
        suggestion = correct(word);
    
    if(word) {    
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Your word was: '+ word + '\n');
        if (suggestion)
            response.end('The correct spelling might be: ' + suggestion);
    } else {
        response.writeHead(400);
        response.end('Bad Request');
    }
}).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000');