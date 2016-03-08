(function () {
  var $thumbs = $(".thumbs");
  $thumbs.on("click", ".thumbnail", function () {
    var $this = $(this);
    $this.parent().append("<p>" + $this.data("meta").text + "</p>");
  });
})();