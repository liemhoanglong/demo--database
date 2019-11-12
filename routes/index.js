var express = require('express');
var router = express.Router();

//1.require mongoose
var mongoose = require('mongoose');

//2.connect
mongoose.connect('mongodb://localhost/demo-express');

//3.tạo Schema
var BlogDataSchema = new mongoose.Schema({
	title: String,
	content: String,
  date: Date,
  writter: String,
  tag: String 
}, { collection: 'BlogData' });

//4.tạo model
var BlogData = mongoose.model('BlogData', BlogDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/blog', function(req, res, next) {
  res.render('blog');
});

router.get('/login', function(req, res, next) {
  res.render('pages/login',{layout:false});
});
router.get('/forget-pass', function(req, res, next) {
  res.render('pages/forget-pass',{layout:false});
});
router.get('/register', function(req, res, next) {
  res.render('pages/register',{layout:false});
});
router.get('/write-blog', function(req, res, next) {
  res.render('write-blog');
});

router.get('/get-data', function (req, res, next) {
	BlogData.find()
		.then(function (doc) {
			res.render('write-blog', { items: doc });
		});
});

router.post('/insert', function (req, res, next) {
	var item = {
		title: req.body.title,
		content: req.body.content,
		writter: req.body.writter,
		date: req.body.date,
		tag: req.body.tag
	};

	var data = new BlogData(item);
	data.save();

	res.redirect('/get-data');
});

router.post('/update', function (req, res, next) {
	var id = req.body.id;

	BlogData.findById(id, function (err, doc) {
		if (err) {
			console.error('error, no entry found');
		}
		doc.title = req.body.title;
		doc.content = req.body.content;
		doc.writter = req.body.writter;
		doc.date = req.body.date;
		doc.tag = req.body.tag;
		doc.save();
	})
	res.redirect('/get-data');
});

router.post('/delete', function (req, res, next) {
	var id = req.body.id;
	BlogData.findByIdAndRemove(id).exec();
	res.redirect('/get-data');
});

module.exports = router;
