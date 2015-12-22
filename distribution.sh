curl -s http://richlist.btsgame.org/$1.json | ./asset-holders.js | while read p; do printf "$p:123\n"; done | ./dividends.js --profit $2 | awk -v from="$1" -F":" '{print "transfer "from" "$1" "$2 " CNY 0 true"}'

