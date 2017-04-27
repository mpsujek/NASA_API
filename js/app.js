$(function() {
    var section1 = $('.section1');
    var section2 = $('.section2');
    var day = Math.floor(Math.random() * 27) + 1;
    var month = Math.floor(Math.random() * 11) + 1;
    var date = 2016 + '-' + month + '-' + day;
    var bottomIndex = 0;
    var topIndex = 6;
    var button = $('.button');

    urlNasaPhotos = 'https://api.nasa.gov/planetary/apod';
    urlMarsPhotos = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';


    $.ajax({
            url: urlNasaPhotos,
            type: 'GET',
            dataType: 'json',
            data: {
                date: date,
                api_key: 'iRbaJrz7oNWBzn62CLfAmk5hFwZ6Fg3K9assHu5W'
            }
        })
        .done(function(result) {
            var photo = result.url;
            section1.css('background-image', 'url(' + photo + ')');
            section1.find('p').text(result.title + ' photo from: ' + date);
        })
        .fail(function(error) {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    $.ajax({
            url: urlMarsPhotos,
            type: 'GET',
            dataType: 'json',
            data: {
                earth_date: date,
                api_key: 'iRbaJrz7oNWBzn62CLfAmk5hFwZ6Fg3K9assHu5W'
            }
        })
        .done(function(result) {
            var photo = result.photos;
            // console.log(photo);
            $.each(photo, function(index, image) {
                  if ( index > bottomIndex && index < topIndex) {
                    var img = $("<img>");
                    img.attr("src", image.img_src);
                    img.appendTo('.gallery');
                  }
            });

        })
        .fail(function(error) {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });


        button.click(function(){
          bottomIndex += 6;
          topIndex += 6;
          $.ajax({
                  url: urlMarsPhotos,
                  type: 'GET',
                  dataType: 'json',
                  data: {
                      earth_date: date,
                      api_key: 'iRbaJrz7oNWBzn62CLfAmk5hFwZ6Fg3K9assHu5W'
                  }
              })
              .done(function(result) {
                  var photo = result.photos;
                  // console.log(photo);
                  $.each(photo, function(index, image) {
                      // console.log(image, index);
                      // console.log(image.img_src);
                      if ( index > bottomIndex && index < topIndex) {
                        var img = $("<img>");
                        img.attr("src", image.img_src);
                        img.appendTo('.gallery');
                      }
                  });

              });

        });

});
