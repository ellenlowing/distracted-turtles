
var interval;
var colors = ['#8d9876', '#cbb345', '#609f80', '#4b574d', '#af420a', '#314856', '#ecbbad', '#798881', '#9d5141', '#a67f48', '#cb654f', '#cfcb9c', '#8cbea3', '#dfba47'];
init();

function init () {
  // reset elements to default after css transitions
  console.log($('.hashtags').outerHeight());
  if( $(window).width() <= 768 ) $('.posts').css('top', $('.hashtags').outerHeight() + 'px');
  $('.hashtags li').hide();
  $('.posts li').hide();
  $('.hashtags').css('padding', '0');
  $('.posts').css('padding', '0');
  $('.blog-index').css('height', '0');
  setTimeout( () => {
    $('*').attr('style', '');
    if( $(window).width() <= 768 ) $('.posts').css('top', $('.hashtags').outerHeight() + 'px');
  }, 2000);
  setTimeout( () => {
    $('.fade-in').removeClass('fade-in');
  }, 2500);
  setTimeout( () => {
    $('.zero-opacity').removeClass('zero-opacity'); // for fadeinandup transitions
  }, 3500);
  setTimeout( () => {
    $('*').css('animation', 'none');
  }, 4500);

  $( window ).resize(resize);

  $('.post-title').on( 'mouseenter', function() {
    var label = $(this).children().children('.minsread-label');
    label.show();
    label.css('background-color', function() {
      var randcolor = colors[Math.floor(Math.random() * Math.floor(colors.length))];
      var bgcolor = rgb2hex(label.css('background-color'));
      while(randcolor == bgcolor) {
        randcolor = colors[Math.floor(Math.random() * Math.floor(colors.length))];
      }
      return randcolor;
    });
    var fullText = '8 mins read ';
    var movingText = '';
    var charCount = label.width() / (parseFloat(label.css('font-size')) + parseFloat(label.css('letter-spacing')) / 2) - 2;
    var charIter = 0;
    for(var i = 0; i < charCount; i++) {
      movingText = movingText + fullText.charAt(charIter);
      if(charIter < (fullText.length-1)) charIter++;
      else charIter = 0;
    }
    label.find('p').html(movingText);
    setTimeout( () => {
      clearInterval(interval);
      interval = setInterval( function() {
        label.find('p').html(movingText);
        movingText = movingText.substr(1) + fullText.charAt(charIter);
        if(charIter < (fullText.length-1)) charIter++;
        else charIter = 0;
      }, 300);
    }, 800 );


  }).on('mouseleave', function() {
    $(this).children().children('.minsread-label').hide();
    clearInterval(interval);
  });

  $('.switch input').on('change', (e) => {

    $('.post').hide();
    $('.nothing').hide();

    var showAll = true;
    $.each($('.switch input'), function(index, val) {
      if($(this).prop('checked')) {
        showAll = false;
      }
    });

    if(showAll) {
      $('.post').show();
    } else {
      // show posts based on selected hashtags
      var posts = [];
      $.each($('.switch input:checked'), function(index, val) {
        var cls = '.post.' + $('.switch input:checked')[index].id.substring(6);
        posts = $.merge(posts, $(cls));
      });
      if(posts.length > 0) {
        $.each(posts, function (i, val) {
          val.style.display = 'block';
        });
      } else {
        $('.nothing').show();
      }
    }
  });
}

function update () {

}

function resize () {
  if( $(window).width() <= 768 ) $('.posts').css('top', $('.hashtags').outerHeight() + 'px');
}

var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");

// Function to convert rgb color to hex format
function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
