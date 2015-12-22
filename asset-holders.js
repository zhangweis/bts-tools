#!/usr/bin/env node

var fs = require('fs');
var lodash = require('lodash');
var json=JSON.parse(fs.readFileSync('/dev/stdin').toString());

console.log(lodash.pluck(json.data,'address').join('\n'));
