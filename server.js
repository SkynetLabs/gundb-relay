// the port we're using for this relay
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765;

// import gun with zenbase adapter
var {zenbase} = require('zenbase')
const express = require('express')

// create a express app using gun
const app = express()
app.use(zenbase.serve)

const server = app.listen(port, () => {
    console.log("Listening at: http://localhost:" + port);
    console.log(`Running with DEBUG set to ${process.env["DEBUG"]}, PORTAL set to ${process.env["PORTAL"]}, UNTIL set to ${process.env["UNTIL"]}`)
})

// init gun as seen here https://github.com/amark/gun/blob/master/examples/express.js
var gun = zenbase({
    web: server,
    store: false,
    // the secret for skynet
    secret: process.env["SECRET"] || "YOUR_SECRET_HERE", 
    // the skynet portal
    portal: process.env["PORTAL"] || "https://siasky.net", 
    // whether we want additional debug settings on
    debug: process.env["DEBUG"] || false,
    // decreases the frequency that gun writes to the storage adapter. See issue here: https://github.com/Fluffy9/Zenbase/issues/1#issuecomment-823504402 
    until: process.env["UNTIL"] || 2*1000
}) 

global.Gun = gun; /// make global to `node --inspect` - debug only
global.gun = gun; /// make global to `node --inspect` - debug only

