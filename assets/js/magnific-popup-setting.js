$(document).ready(function() {
    $('.page__content img[id="magnific"]').wrap( function(){
        $(this).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            showCloseBtn: false,
            items: {
              src: $(this).attr('src')
            },
        });
        $(this).parent('p').css('overflow', 'auto');
        return '<a href="' + $(this).attr('src') + '" style="width:' + $(this).attr('width') +'px; margin: ' + $(this).attr('margin') + 'px; display:inline-block;"><figure> </figure>' + '<figcaption style="text-align: center;" class="caption">' + $(this).attr('alt') + '</figcaption>' + '</a>';
    });
});
