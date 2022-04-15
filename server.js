// Port used for accessing gundb
var port =
  process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.VCAP_APP_PORT ||
  process.env.PORT ||
  process.env.GUNDB_PORT ||
  process.argv[2] ||
  8765;
// Import the Skynet GunDB Adapter
var { zenbase } = require('skynet-gundb-adapter');
const server = require('http').createServer().listen(port);

var gundb = zenbase({
  web: server,
  // SkyDB Secret used for portals to be able to access the same GunDB data
  secret: process.env['SECRET'] || 'SkyDB GunDB Production Secret',
  // the skynet portal
  portal: process.env['PORTAL'] || 'https://siasky.net',
  // whether we want additional debug settings on
  debug: process.env['DEBUG'] || false,
  // whether we want additional debug settings on
  skynetApiKey: process.env['SKYNETAPIKEY'] || undefined,
  // decreases the frequency that gun writes to the storage adapter. See issue here: https://github.com/Fluffy9/Zenbase/issues/1#issuecomment-823504402
  until: process.env['UNTIL'] || 2 * 1000,
});

console.log(
  `SECRET set to ${process.env['SECRET']}, PORTAL set to ${process.env['PORTAL']}, DEBUG set to ${process.env['DEBUG']}, UNTIL set to ${process.env['UNTIL']}`
);
console.log('Relay peer started on port ' + port + ' with /gun');
module.exports = gundb;
