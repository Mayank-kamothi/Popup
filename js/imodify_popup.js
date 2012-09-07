/**
 * @file
 * Javascript for the image tag on clinet side.
 * Basically, if it's on the /ImageTag, it's probably here.
 */
 
(function($) {
Drupal.behaviors.popupBehavior = {
  attach: function (context, settings) {

//code starts

  //Popup type
  var type = $('#popup_type').val();

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

  /* Menu Popup with json */ 
  function addPopupToMenu(title, message, message_counter, id, prev_id, next_id) {
    $('ul.menu li').each(function(){
      var links = $(this).find('a').html();
      if(links == title) {
        $(this).find('a').addClass("create-tooltip");
        $(this).find('a').wrapInner("<span id='popup_"+ id +"'></span>");
        $(this).find('a').attr('title', message + '<a href="javascript:void(0)" onclick="goToByScroll('+ prev_id +')">>Go to anchor 1</a>');
        Tipped.create('.create-tooltip');
      }
    });
  }
  $.getJSON("/imodify_popup/menu/all/ajax", function(tags){
    $.each(tags, function(key,tag){
      addPopupToMenu(tag.title, tag.message, tag.message_counter, tag.id, tag.prev_id, tag.next_id);
    });
  });

  /* Heading Popup with json */
  function addPopupToHeading(title, message, message_counter, id, prev_id, next_id) {
    $("#main").find("h1").each(function() {
      if($(this).html() == title) {
        $(this).addClass("create-tooltip");
        $(this).wrapInner("<span id='popup_"+ id +"'></span>");
        $(this).attr('title', message);
        Tipped.create('.create-tooltip');
      }
    });
  }
  $.getJSON("/imodify_popup/heading/all/ajax", function(tags){
    $.each(tags, function(key,tag){
      addPopupToHeading(tag.title, tag.message, tag.message_counter, tag.id, tag.prev_id, tag.next_id);
    });
  });

  /* CssClass Popup with json */
  function addPopupToCssClass(title, message, message_counter, id, prev_id, next_id) {
    $("#main").find("." + title).each(function() {
        $(this).addClass("create-tooltip");
        $(this).wrapInner("<span id='popup_"+ id +"'></span>");
        $(this).attr('title', message);
        Tipped.create('.create-tooltip');
    });
  }
  $.getJSON("/imodify_popup/cssClass/all/ajax", function(tags){
    $.each(tags, function(key,tag){
      addPopupToCssClass(tag.title, tag.message, tag.message_counter, tag.id, tag.prev_id, tag.next_id);
    });
  });
  
  /* CssId Popup with json */
  function addPopupToCssId(title, message, message_counter, id, prev_id, next_id) {
    $("#main").find("#" + title).each(function() {
        $(this).addClass("create-tooltip");
        $(this).wrapInner("<span id='popup_"+ id +"'></span>");
        $(this).attr('title', message + "<a href='http://152.drupal7.mak/imodify_popup#popup_"+ prev_id +"'>Prev</a>");
        Tipped.create('.create-tooltip');
    });
  }
  $.getJSON("/imodify_popup/cssId/all/ajax", function(tags){
    $.each(tags, function(key,tag){
      addPopupToCssId(tag.title, tag.message, tag.message_counter, tag.id, tag.prev_id, tag.next_id);
    });
  });

  //code ends
  }
};
})(jQuery);


