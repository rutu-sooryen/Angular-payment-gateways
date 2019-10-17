const http = require('http');
const https = require('https');
const qs = require('querystring');
const port = 3000;
const checksum_lib = require('./checksum.js');

var PaytmConfig = {
	mid: "xOpHGh95840523930721",
	key: "ugXv2LAfU!ZRwO1X",
	website: "WEBSTAGING"
}


http.createServer(function (req, res) {

	switch (req.url) {
		case "/":
			var params = {};
			params['MID'] = PaytmConfig.mid;
			params['WEBSITE'] = PaytmConfig.website;
			params['CHANNEL_ID'] = 'WEB';
			params['INDUSTRY_TYPE_ID'] = 'Retail';
			params['ORDER_ID'] = 'OrderId@1234567890' + new Date().getTime();
			params['CUST_ID'] = 'Customer001';
			params['TXN_AMOUNT'] = '1.00';
			params['CALLBACK_URL'] = 'http://localhost:' + port + '/callback';
			params['EMAIL'] = 'r.d@abc.com';
			params['MOBILE_NO'] = '1234567890';

			checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify({ 'checksum': checksum }));
				res.end();
			});
			break;

		case "/callback":

			var body = '';

			req.on('data', function (data) {
				body += data;
			});

			req.on('end', function () {
				var html = "";
				var post_data = qs.parse(body);


				// received params in callback
				console.log('Callback Response: ', post_data, "\n");
				html += "<b>Callback Response</b><br>";
				for (var x in post_data) {
					html += x + " => " + post_data[x] + "<br/>";
				}
				html += "<br/><br/>";


				// verify the checksum
				var checksumhash = post_data.CHECKSUMHASH;
				// delete post_data.CHECKSUMHASH;
				var result = checksum_lib.verifychecksum(post_data, PaytmConfig.key, checksumhash);
				console.log("Checksum Result => ", result, "\n");
				html += "<b>Checksum Result</b> => " + (result ? "True" : "False");
				html += "<br/><br/>";



				// Send Server-to-Server request to verify Order Status
				var params = { "MID": PaytmConfig.mid, "ORDERID": post_data.ORDERID };

				checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

					params.CHECKSUMHASH = checksum;
					post_data = 'JsonData=' + JSON.stringify(params);

					var options = {
						hostname: 'securegw-stage.paytm.in', // for staging
						// hostname: 'securegw.paytm.in', // for production
						port: 443,
						path: '/merchant-status/getTxnStatus',
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Length': post_data.length
						}
					};


					// Set up the request
					var response = "";
					var post_req = https.request(options, function (post_res) {
						post_res.on('data', function (chunk) {
							response += chunk;
						});

						post_res.on('end', function () {
							console.log('S2S Response: ', response, "\n");

							var _result = JSON.parse(response);
							html += "<b>Status Check Response</b><br>";
							for (var x in _result) {
								html += x + " => " + _result[x] + "<br/>";
							}

							res.writeHead(200, { 'Content-Type': 'text/html' });
							res.write(html);
							res.end();
						});
					});

					// post the data
					post_req.write(post_data);
					post_req.end();
				});
			});

			break;
	}


}).listen(port);
