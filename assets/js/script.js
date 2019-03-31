init();

function init () {
  var interval;
  $('.post-title').on( 'mouseenter', function() {
    var label = $(this).children().children('.minsread-label');
    label.show();
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
    interval = setInterval( function() {
      label.find('p').html(movingText);
      movingText = movingText.substr(1) + fullText.charAt(charIter);
      if(charIter < (fullText.length-1)) charIter++;
      else charIter = 0;
    }, 200);

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
      console.log($(this).prop('checked'));
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
