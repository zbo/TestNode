const readline = require('readline');
const format = require('string-format')
format.extend(String.prototype, {})

const fs = require('fs');
const os = require('os');

var git_address = 'https://github.microstrategy.com/api/v3/repos'

var objReadline = readline.createInterface({
    input: fs.createReadStream(__dirname + '/out_file'),
});

objReadline.on('line', (line) => {
    tmp_arr = line.split(' ');
    tail = tmp_arr[0];
    defects = tmp_arr[1];
    url = '{0}/{1}'.format(git_address, tail)
    console.log(url);
});


