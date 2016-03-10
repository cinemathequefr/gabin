

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var template = _.template('<div class="column"><div class="item"><img class="thumbnail" data-id="{{id}}" src="http://cf.pasoliniroma.com/static/gabin/300x390/{{ id }}.jpg" alt="{{ title }}" title="{{ title }}"></div></div>');
viewer.init($(".viewer"));

$.getJSON("data/data.json", function (data) {
  var $gallery = $(".gallery");

  _(data)
  .map(function (section) {
    return _.map(section, function (item) {
      return template(item);
    }).join("");
  })
  .forEach(function (sectionHtml, i) {
    $gallery.eq(i).append(sectionHtml);
  });

  $gallery.on("click", "img", function () {
    viewer.open(_(data).flatten().find({ id: $(this).data("id") }));
  });

  $(document.body).fadeIn(500);
});