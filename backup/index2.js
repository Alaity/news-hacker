// 当前项目（包）的入口文件

// 1. 加载http模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// 2. 创建服务
http.createServer().on('request',function(req, res) {
// 代码部分

	// 设计路由
	// 当用户请求 / 或 /index 时，显示新闻列表 - get 请求
	// 当用户请求 /deatil 时显示新闻详情 - get 请求
	// 当用户请求 /submit 时，显示添加新闻页面 - get 请求
	// 当用户请求 /add 时,将用户提交的新闻保存到 data.json - get 请求
	// 当用户请求 /add 时,将用户提交的新闻保存到 data.json - post 请求
	// 将用户请求的url 和 method 装换为小写字母 
	// req.url = req.url.toLowerCase();
	// req.url = req.method.toLowerCase();
	// // console.log(req.url)

	// 先根据用户提交的路由，显示不同的HTML页面
	// console.log(req.url)
	if (req.url === '/' || req.url === '/index') {
		// 1. 读取 index.html 并返回
		render(path.join(__dirname, 'htmls', 'index.html'), res);
	} else if (req.url === '/submit') {
		// 1. 读取 submit.html 并返回
		render(path.join(__dirname, 'htmls', 'submit.html'), res);
	} else if (req.url === '/detail') {
		// 1. 读取 detail;html 并返回
		render(path.join(__dirname, 'htmls', 'detail.html'), res);
	} else if (req.url === '/add' && req.method === 'get') {
		// 1. 表示 get 方式提交一条新闻
		
	} else if (req.url === '/add' && req.method === 'post') {
		// 1. 表示 post 方式提交一条新闻
		
	} else if (req.url.indexOf('/public') === 0) {
		// 加载静态资源
		render(path.join(__dirname, req.url), res);


	} else{
		res.writeHeader(404, 'Not Found', {
		'Content-Type': 'text/plain; charset = utf-8'
		});
		res.end('404,Page Not Found');
	}
}).listen(3000, function() {
	console.log('http://localhost:3000');
});


//封装一个render函数用来读取文件
function render(filename, res) {
	fs.readFile(filename, function(err, data) {
		if (err) {
			res.setHeader('Content-Type', 'text/txt');
			res.end('文件不存在 404');
		}else {
			res.setHeader('Content-Type', mime.getType(filename));
			res.end(data);
		}
	});
}