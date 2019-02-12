const readline = require('readline');
const format = require('string-format')
format.extend(String.prototype, {})

const fs = require('fs');
const os = require('os');
const request = require('request');

var git_address = 'https://github.microstrategy.com/api/v3/repos'

var objReadline = readline.createInterface({
    input: fs.createReadStream(__dirname + '/out_file.1'),
});

var token = fs.readFileSync(__dirname + '/token', 'utf-8');

objReadline.on('line', (line) => {
    tmp_arr = line.split(' ');
    tail = tmp_arr[0];
    defects = tmp_arr[1];
    url = '{0}/{1}'.format(git_address, tail)

    var options = {
        url: url,
        headers: {
            'Authorization': 'token {0}'.format(token),
            'Accept': 'application/vnd.github.v3.raw'
        }
    };
    request(options, http_callback);
});

function http_callback(error, response, body) {
    console.log(response.statusCode)
}

