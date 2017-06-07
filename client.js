var request = require('request');


var obj = {};

obj.vorname="Thorsten";
obj.nachname="Zoerner";

request.post("http://localhost:8001/put", {form:obj}).on('data', function(data) { 
	
	request.post("http://localhost:8001/get",{form:{key:data.toString()}}).on('data',	function(d) {
		
			console.log(d.toString());
	});;
	console.log(data.toString()); 
	
	
});
