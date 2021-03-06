
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

for (var i = 1; i<36; i++){
url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+String(i);

request(url, function(error, response, body){
    if(!error){
    	var $ = cheerio.load(body);

	    $('a.poi-card-link').filter(function(){
	    	var data = $(this); 
	        var link = "https://restaurant.michelin.fr"+data.attr('href');      
	        request(link, function(error, response, body){
	        	var $ = cheerio.load(body);
	            var json = { title : "", address:"", postCode:""};

	            $(".poi_intro-display-title").each(function() {
	            	data = $(this);
	                var title = data.text().trim();
	                json.title = title;
	            });

	            $(".thoroughfare").each(function() {
	                data = $(this);
	                var address = data.text().trim();
	                json.address = address;
	            });

	            $(".postal-code").each(function() {
	                data = $(this);
	                var postCode = data.text();
	                json.postCode = postCode;
	            });
	            fs.appendFile('output.json', JSON.stringify(json)+"\r\n", function(err){});

	        }); 
	    })
	}		
  }) ;}
