console.log('Start to get Shopify images!');

var getJSON = require('get-json');
const fs = require('fs');
const download = require('download');

var key = '', //add your key
	secret = '', //add your secret
	store = '', //add your store slug on Shopify
	limit = 10, //define how many products the API will show for page
	fields = '?fields=title,images&limit='+limit,
	page = '&page=',
	pathToSave = ''; //your local path like /Users/dev/my-store

var urlCount = 'https://'+key+':'+secret+'@'+store+'.myshopify.com/admin/products/count.json';
var urlProducts = 'https://'+key+':'+secret+'@'+store+'.myshopify.com/admin/products.json'+fields+page;

getJSON(urlCount, function(error, response){

    error
    // undefined

    response.result
    var productCount = response.count; //count products
    var pagesCount = Math.round(productCount / limit); //count how many pages of json is needed to process

		console.log("You have " + productCount + " products.");
		console.log("On " + pagesCount + " pages.");

		for (var c = 0; c < pagesCount; c++) {
			var index = c+1;
			getImages(urlProducts, index);
		};

    response.ok

})

function removeParam(key, sourceURL) {
	var rtn = sourceURL.split("?")[0],
	param,
	params_arr = [],
	queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
	if (queryString !== "") {
		params_arr = queryString.split("&");
		for (var i = params_arr.length - 1; i >= 0; i -= 1) {
			param = params_arr[i].split("=")[0];
			if (param === key) {
				params_arr.splice(i, 1);
			}
		}
		rtn = rtn + params_arr.join("&");
	}
	return rtn;
}

function getImages(url){

	getJSON(url, function(error, response){

	    error
	    // undefined

	    response.result;
		var productsList = response.products;
		// console.log(productsList);
		// console.log(productsList.length);

		for (var i = 0; i < productsList.length; i++) {
			var productName = productsList[i].title;
			var folderName = productName.replace(/[^\w\s]/gi, '');
			var productImages = productsList[i].images;
			console.log(folderName);
			console.log(productImages.length);

			var images = [];


			for (var a = 0; a < productImages.length; a++) {
				var url = productImages[a].src;
				var file = removeParam("v", url)
				images.push(file);
			};

			console.log(images);

			Promise.all(images.map(x => download(x, pathToSave+folderName ))).then(() => {
				console.log('Files Downloaded!');
			});
		};

	    response.ok
	  // => true

	})
	return true;
};
