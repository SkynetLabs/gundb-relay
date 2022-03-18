# gundb-relay
A [gundb](https://gun.eco/) relay that lives on [Skynet](https://github.com/SkynetLabs/skynet-webportal) portals.

# The Relay
The relay is simply a http endpoint to a GunDB instance running on a server as a peer. 
1. This peer is more reliable due to running on a server. 
2. It prevents data from being lost when the other devices disconnect
3. It prevents data from being lost when all the other peers may have limited amounts of the entire data set

# The Adapter
The adapter is found [here](https://github.com/SkynetLabs/gundb-adapter). The relay can back up data to a storage adapter. This can be places like S3, a database or in this case Skynet's SkyDB. 

# Options
A number of options have been defined in the relay to optimize how GunDB interacts with Skynet. These options are passed into the adapter.
The only different one is the `web` option. A http server is passed in. This server is what is hosted on the Skynet portal and what responds to requests. 
You should also make sure that the secret is set appropriately. If you want multiple relays storing and retrieving from the same place then you need to make sure that the secret is the same. This secret is what's used to generate the `publicKey` and `privateKey` for SkyDB.

See the adapter documentation for more
The Gun instance should be available from http://localhost:8765/gun by default

```
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
```

# The Docker Image
The docker image simply wraps the Nodejs application. You can use enviornment variables to change the relay port or any of the settings mentioned on the adapter. 

If you are running the application locally you should use 
`docker run -d -p 8765:8765 --name gundb-relay skynetlabs/gundb-relay`

On the server, you should use this to avoid issues with websockets and ports
`docker run -d -p 8765:8765 --network host --rm --name gundb-relay skynetlabs/gundb-relay` 

