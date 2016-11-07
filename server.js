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

app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('dist'))




var result = []
var single = []
app.post('/urlping', function (req, res) {
	var host = []
	single = []
	host.push(req.body.url)
	host.forEach(function (host) {
		ping.promise.probe(host, { timeout: 10 }).then(function (res) { 
			let data = {
				id: Date.now(),
				data: res
			}
			result.push(data)
			single.push(data)
		})
	})
	if (req.body.url) res.send('ok url loading ping : www.' + req.body.url)
	else res.send('not ok url error')
})

app.get('/api/data', function (req, res) {
	res.send(result)
})
app.get('/api/single', function (req, res) {
	res.send(single)
})


app.delete('/api/del/:id', function (req, res) {
	let index = result.findIndex(item => item.id === parseInt(req.params.id))
	result.splice(index, 1)
  	res.send('DELETE request id : ' + req.params.id)
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
