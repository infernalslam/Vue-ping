var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var ping = require('ping')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
  next()
})
app.use(express.static('dist'))
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))





var result = []
var single = []

app.post('/urlping', function (req, res) {
	var host = []
	host.push(req.body.url)
	host.forEach(function (host) {
		ping.promise.probe(host, { timeout: 80 }).then(function (res) { 
			var data = {
				id: Date.now(),
				data: res
			}
			result.push(data)
		})
	})
	if (req.body.url) res.send('ok url loading ping : www.' + req.body.url)
	else res.send('not ok url error')
})

app.get('/api/data', function (req, res) {
	res.send(result)
})
app.post('/api/single', function (req, res) {
	let host = []
	host.push(req.body.url)
	host.forEach(function (host) {
		ping.promise.probe(host, { timeout: 80 }).then(function (res) { 
			let data = {
				id: Date.now(),
				data: res
			}
			single.push(data)
		})
	})
	if (req.body.url) res.send('ok url loading ping : www.' + req.body.url)
	else res.send('not ok url error')
})
app.delete('/api/single', function (req, res) {
	single = []
	res.send(single)
})
app.get('/api/single', function (req, res) {
	res.send(single)
})


app.delete('/api/del/:id', function (req, res) {
	var index = result.findIndex(item => item.id === parseInt(req.params.id))
	result.splice(index, 1)
  	res.send('DELETE request id : ' + req.params.id)
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
