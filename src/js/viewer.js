var viewer = (function () {

  var $elViewer;
  var $elViewerContent;
  var $elViewerClose;
  var $elViewerImg;
  var _isOpen = false;

  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  var template = _.template('<h1>{{ title }}</h1><div>{{ text }}</div><hr><ul><li>Affichiste&nbsp;: {{ author }}</li><li>Date&nbsp;: {{ date }}</li><li>Pays&nbsp;: {{ country }}</li><li>Procédé&nbsp;: {{ medium }}</li><li>Dimensions&nbsp;: {{ size }}</li><li>Droits&nbsp;: {{ rights }}</li></ul>');

  function init() {
    $elViewer = arguments[0];
    // $elViewer.append("<div class='viewerContent'></div><div class='viewerClose'></div>");
    $elViewer.append("<div class='row'><div class='viewerContent hide-for-small-only medium-8 columns'></div><div class='viewerInfo small-12 medium-4 columns'></div></div><div class='viewerClose'></div>");
    $elViewerContent = $elViewer.find(".viewerContent");
    $elViewerInfo = $elViewer.find(".viewerInfo");
    $elViewerClose = $elViewer.children(".viewerClose");
    $(window).on("resize", windowResize);
  }

  function open(item) {
    var preloader = new ImagePreloader();
    var src = "http://cf.pasoliniroma.com/static/gabin/full/" + item.id + ".jpg";
    preloader.queue(src);
    preloader.preload().then(function () {
      $elViewerContent.html("<img src='" + src +"'>");
      $elViewerInfo.html(template(item));

      $elViewerImg = $elViewerContent.children("img");
      windowResize();
      $elViewer.fadeIn(250, function () {
        _isOpen = true;
        $elViewerClose.one("click", close);
        $(document).one("keydown", function (e) {
          if (e.which === 27) {
            $elViewerClose.addClass("on");
          }
        });
        $(document).on("keyup", function (e) { // Close with Escape key
          if (e.which  === 27) {
            $elViewerClose.removeClass("on");
            $(document).off("keyup");
            close();
          }
        });
      });
    });
  }


  function windowResize() {
    var ww = ($(window).width() * 2 / 3) - 24; // 2*12px margin
    // var ww = $(window).width() - 24; // 2*12px margin
    var wh = $(window).height() - 24;
    var f = fitInBox($elViewerImg[0].naturalWidth, $elViewerImg[0].naturalHeight, ww, wh, true);

    $elViewerImg.css({
      width: f.width + "px",
      height: f.height + "px",
      position: "absolute",
      top: 12 + ((wh - f.height) / 2) + "px",
      left: 12 + ((ww - f.width) / 2) + "px"
    });

  }


  function close() {
    $elViewer.fadeOut(250, function () {
      $elViewerContent.empty();
      _isOpen = false;
      $(this).hide();
    })
  }

  function isOpen() {
    return _isOpen;
  }


  function fitInBox(width, height, maxWidth, maxHeight, isExpandable) {
    var aspect = width / height;
    var initWidth = width;
    var initHeight = height;
    if (width > maxWidth || height < maxHeight) {
      width = maxWidth; height = Math.floor(width / aspect);
    }
    if (height > maxHeight || width < maxWidth) {
      height = maxHeight; width = Math.floor(height * aspect);
    }
    if (!!isExpandable === false && (width >= initWidth || height >= initHeight)) {
      width = initWidth; height = initHeight;
    }
    return { width: width, height: height };
  }

  return {
    init: init,
    open: open,
    isOpen: isOpen
  };

})();