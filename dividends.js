#!/usr/bin/env node

//input
//account1:222
//account2:333
//expected output:
//account1:50
//account2:70
var argv = require('minimist')(process.argv.slice(2));
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var distributions = [];
rl.on('line', function(line){
	var holder = line.split(':');
	distributions.push({account:holder[0], holding: Number(holder[1])});
});
rl.on('close',function(){
	var sum = distributions.reduce(function(total, b){
		return total+b.holding;
	}, 0);
	distributions.forEach(function(d){
		console.log(d.account+':'+(d.holding/sum)*argv.profit);
	});
});

