var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

        var name= "Le Bec au Cauchois";
    
        url = 'https://www.lafourchette.com/search-refine/'.concat(name);


        request(url, function(error, response, html){
        if(!error){

            var $ = cheerio.load(html);
            $('.resultItem-information').each(function(){

                var address = $(this).find(".resultItem-address").text();
                console.log(address);

                if(address.includes("76540")){
                    console.log("Enter if");
                    var link = $(this).find(".resultItem-name > a");
                    var urlEnd = link.attr("href");
                    var newUrl = "https://www.lafourchette.com"+String(urlEnd);

                    request(newUrl, function(error, response, html){
                    if(!error){
                        var $ = cheerio.load(html);

                        console.log("Href recup");

                        var name, promotion;
                        var json = new Object;

                        $('.restaurantSummary-name').each(function(){


                            var data = $(this);

                            name = data.text();
                        
                            json.name = name.trim();
                        })

                        $('.saleType--specialOffer > h3').each(function(){


                            var data = $(this);

                            promotion = data.text();

                            json.promotion = promotion;
                        })

                        fs.writeFile('output_lafourchette.json', JSON.stringify(json, null, 4), function(err){

                console.log('copy to output_lafourchette.json');

            })
                }
            })
                }


            })

        }
        

    })