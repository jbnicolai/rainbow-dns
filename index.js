#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
    default : {
        apihost : '127.0.0.1',
        apiport : 8080,
        dnshost : '127.0.0.1',
        dnsport : 53,
        store   : 'mem',
        domain  : require('random-domain')(),
        ttl     : 300,
    }
})
var utils      = require('./utils')
var api        = require('./api')
var dns        = require('./dns')
var ttloop     = require('./ttloop')
var staticloop = require('./staticloop')

utils.displayVersionMaybe(argv)
utils.displayHelpMaybe(argv)
var store = utils.selectStore(argv)

store.ready(function () {
    dns(argv, store).start()
    api(argv, store).start()
    ttloop(store).start()
    if (argv.static) staticloop(argv, store).start()
    utils.displayStartMessage(argv)
})
