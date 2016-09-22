var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 3000,
	app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/books');
var bookShema = mongoose.Schema({
	author: String,
	bookTitle: String,
	yearPub: Number
});

var Book = mongoose.model('Book', bookShema);

var router = express.Router();
router.route('/')
	.get(function(req, res){
		Book.find(function(err, books){
			if(err){
				res.send(err);
			}
			res.send(books);
		});
	})
	.post(function(req, res){
		var book = new Book();
		book.author = req.body.author;
		book.bookTitle = req.body.bookTitle;
		book.yearPub = req.body.yearPub;
		book.save(function(err){
			if(err){
				res.send(err);
			}

			res.send({message: 'book created'});
		});
	});

app.use('/api', router);

app.listen(port, function(){
	console.log('Listening on port ' + port);
})	