#!/usr/bin/env node
'use strict';
var graphene = require('graphene');
var lodash = require('lodash');
var ws = 'wss://bitshares.dacplay.org/ws'
//var ws = 'wss://bit.btsabc.org/ws';//('wss://bitshares.dacplay.org/ws');

//ws = 'ws://120.27.4.72:8090';
var promisify = require("es6-promisify");
var co = require('co'); 
co(function*(){
    var client = yield promisify(graphene.wallet.createWalletClient.bind(graphene.wallet))(ws);
	setTimeout(function(){console.error('timeout 10 seconds.');process.exit(1);}, 10000);
    function send(level, name, params) {
        return promisify(client.send.bind(client))(level, name, params);
    }
	var account = yield send(0, 'get_account_by_name', [process.argv[2]]);
	var assets = yield send(0, "get_assets", [[process.argv[3]]]);
	var precision = Math.pow(10, assets[0].precision);
	var balances = yield send(0, "get_named_account_balances", [process.argv[2], [process.argv[3]]]);
	var balance = balances[0].amount;
	var orders = yield send(0, "get_limit_orders", [process.argv[4], process.argv[3], 1000]);
	var sells = lodash.filter(orders, {seller:account.id, sell_price:{base:{asset_id:process.argv[3]}}});
	var amountOnSale = lodash.sumBy(sells, 'for_sale');
	console.log((balance+amountOnSale)/precision);
	process.exit();
}).catch(e=>{
	console.error(e.stack||e);
	process.exit(1);
});

