/**
 * @file
 * Javascript for the image tag on clinet side.
 * Basically, if it's on the /ImageTag, it's probably here.
 */
 
(function($) {
Drupal.behaviors.popupBehavior = {
  attach: function (context, settings) {

//code starts

var currentUrl = document.URL;
var pieces = currentUrl.split('/');
var type = pieces[pieces.length-1];

/* Table pager onclick event*/
function test() {
  $("ul.pager li > a").click(function () {
   var ajaxlink = $(this).attr('alt');
    $.ajax
      ({
        type: "POST",
        url: ajaxlink,
        data: 'type='+ type,
        success: function(html)
        {
          $("div#popup-wrapper").html(html);
          linkchnage();
          test();
        }
      });
  });
}


/* Table record*/
$.ajax
  ({
    type: "POST",
    url: "/imodify_popup/menu/all",
    data: 'type='+ type,
    success: function(html)
    {
      $("div#popup-wrapper").html(html);
      linkchnage();
      test();
    }
  });
  
/* pager link change */
  function linkchnage() {
    $('ul.pager li').each(function(){
      var links = $(this).find('a').attr('href');
      $(this).find('a').attr('alt', links);
      $(this).find('a').attr('href', '#_');
    })
  }

function addPopupToLink(title, message, message_counter) {
  $('ul.menu li').each(function(){
    var links = $(this).find('a').html();
    if(links == title) {
      $(this).find('a').addClass("create-tooltip");
      $(this).find('a').attr('title', message);
      Tipped.create('.create-tooltip');
    }
  })
}

$.getJSON("imodify_popup/menu/all/ajax", function(tags){
  $.each(tags, function(key,tag){
    addPopupToLink(tag.title, tag.message, tag.message_counter);
  });
});

//code ends

  }
};
})(jQuery);


