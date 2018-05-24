
$('.img-parallax').each(function(){
  var img = $(this);
  var imgParent = $(this).parent();
  var inc = 0;

  function parallaxImg () {
    var speed = img.data('speed');
    var imgY = imgParent.offset().top;
    var winY = $(this).scrollTop();
    var winH = $(this).height();
    var parentH = imgParent.innerHeight();
   
     
    var winBottom = winY + winH;
 
    if (winBottom > imgY && winY < imgY + parentH) {
      
      var imgBottom = ((winBottom - imgY) * speed);
      var imgTop = 2*winH;
      var imgPercent = ((imgBottom / imgTop) * 100)  - (speed * 50);
      
      console.log(imgBottom, imgTop, imgPercent);
    }

    img.css({
      top: imgPercent + '%',
      transform: 'translate(-50%, -' + imgPercent + '%)'
    });
  }
  $(document).on({
    scroll: function () {
      parallaxImg();
    }, ready: function () {
      parallaxImg();
    }
  });
});