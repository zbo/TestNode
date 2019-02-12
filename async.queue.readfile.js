const readline = require('readline');
const format = require('string-format')
format.extend(String.prototype, {})

const fs = require('fs');
const os = require('os');
const request = require('request');
const async = require("async");

var git_address = 'https://github.microstrategy.com/api/v3/repos'
var queueSize = 5;


var objReadline = readline.createInterface({
    input: fs.createReadStream(__dirname + '/out_file'),
});

var token = fs.readFileSync(__dirname + '/token');

var taskHandler = function (task, done) {
    console.log('send req to {}'.format(task.url));
    var options = {
        url: task.url,
        headers: {
            'Authorization': 'token {0}'.format(token),
            'Accept': 'application/vnd.github.v3.raw'
        }
    };
    request(options, function (error, response, body) {
        console.log(response.statusCode)
        done();
    });
};

var myQueue = async.queue(taskHandler, queueSize);

objReadline.on('line', (line) => {
    tmp_arr = line.split(' ');
    tail = tmp_arr[0];
    defects = tmp_arr[1];
    url = '{0}/{1}'.format(git_address, tail)
    // console.log(line)
    myQueue.push({
        url: url
    });
});

myQueue.drain = function () {
    console.log("All the work has been done.");
}