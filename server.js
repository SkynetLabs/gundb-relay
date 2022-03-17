var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765;
var {zenbase} = require('zenbase')
const server = require('http').createServer().listen(port);

var gun = zenbase({
    web: server,
    // the secret for skynet
    secret: process.env["SECRET"] || "YOUR_SECRET_HERE", 
    // the skynet portal
    portal: process.env["PORTAL"] || "https://siasky.net", 
    // whether we want additional debug settings on
    debug: process.env["DEBUG"] || true,
    // decreases the frequency that gun writes to the storage adapter. See issue here: https://github.com/Fluffy9/Zenbase/issues/1#issuecomment-823504402 
    until: process.env["UNTIL"] || 2*1000
}) 


console.log('Relay peer started on port ' + port + ' with /gun');
module.exports = gun
