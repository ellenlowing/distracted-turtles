init();

function init () {
  var interval;
  $('.post-title').on( 'mouseenter', function() {
    var label = $(this).children().children('.minsread-label');
    label.show();
    var fullText = '8minsread';
    var movingText = '';
    var charCount = label.width() / (parseFloat(label.css('font-size')) + parseFloat(label.css('letter-spacing')) / 2);
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
}

function update () {

}
