


var $thumbs = $(".thumbs");
var imgPath = "http://cf.pasoliniroma.com/static/gabin/full/";



viewer.init($(".viewer"));

$thumbs.on("click", "img.thumbnail", function () {
  var meta = $(this).data("meta");
  console.log(meta);
  
  var imgSrc = imgPath + meta.id + ".jpg";


  // var $this = $(this);
  // $this.parent().append("<p>" + $this.data("meta").text + "</p>");
  viewer.open(imgSrc);
});
