const IPFS = require('ipfs');
const Hapi = require('hapi');
const node = new IPFS()

node.on('ready', () => {
  // Your now is ready to use \o/


	//console.log(node);


  // stopping a node
  /*
  node.stop(() => {
    // node is now 'offline'
  })
  */
})

node.on('init', () => {console.log("INIT READY");}); 

node.on('start', () => {
	console.log("STARTED");
		
	const server = new Hapi.Server();
	server.connection({ 
		port: 8001 
	});
	
	server.route({
		method: 'POST',
		path:'/put', 
		handler: function (request, reply) {
			//	console.log("REQUEST",request.payload);
			obj = {};
			obj.enc ="json";
			obj.Data = new Buffer(JSON.stringify(request.payload));
			obj.Links = [];
			node.object.put(obj, (err, node) => {
				  if (err) {
					throw err
				  }
				  console.log(node.toJSON().multihash);
				  return reply(node.toJSON().multihash);
				  // Logs:
				  // QmPb5f92FxKPYdT3QNBd1GKiL4tZUXUrzF4Hkpdr3Gf1gK
				});			
		}
	});

	server.route({
		method: 'POST',
		path:'/get', 
		handler: function (request, reply) {
			//console.log();
			node.object.get(request.payload.key,(err,node) => {
				g=JSON.parse(node.toJSON().data.toString());	
				//console.log(g);
				return reply(node.toJSON().data.toString());
			});
		}
	});

	server.start((err) => {

		if (err) {
			throw err;
		}
		console.log('Server running at:', server.info.uri);
	});	
	
}) 
