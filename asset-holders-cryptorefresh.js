#!/usr/bin/env node

var HtmlDom = require('htmldom');
var fs = require('fs');
var lodash = require('lodash');
var htmlContent=(fs.readFileSync('/dev/stdin').toString());
var html = new HtmlDom(htmlContent);
var $=html.$;
$('#holders_panel table tbody tr td a').each(function(index,item){
	console.log(item.children[0].value)
});
