init();

function init () {
  setTimeout( () => {
    $('.fade-in').removeClass('fade-in');
  }, (Number($('.fade-in').css('animation-duration').slice(0, -1)) + Number($('.fade-in').css('animation-delay').slice(0, -1))) * 1000 - 500);
  
}

function update() {

}
