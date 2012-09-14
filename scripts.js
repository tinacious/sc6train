$(document).ready(function(){

	// Anchor Scroll
	jQuery(function() {
		jQuery('a[href*=#]').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var $target = jQuery(this.hash);
				var $url = this.hash.slice(1);
				var $scrollTime = 600;

				function updateUrl() {
					window.location.hash = encodeURIComponent($url);
				}
				$target = $target.length && $target || jQuery('[name=' + $url + ']');
				if ($target.length) {
					var targetOffset = $target.offset().top;
					jQuery('html,body').animate({scrollTop: targetOffset - 64}, $scrollTime);
					//setTimeout(updateUrl, $scrollTime + 100)
					return false;
				}
			}
		});
	});


	// Table of Contents generation
	buildTOC('h2','nav'); 

	// Take all alt tags and create an image caption below the image using span.caption (CSS too)
	// var imgCaption = $('#content').find('img').attr('alt');

	$('#content img').each(function(){
		var imgCaption = $(this).attr('alt');
		$(this).after("<span class='caption'>" + imgCaption + "</span>");
	});
});

// Functions 

function buildTOC(findTag, whereGoes) {
	var anchorCount = 0;
	// Create a list that will hold the TOC
	var List = $("<ul id='theTOC'>");

	// for each one of the header tags, create a new named anchor and insert it into, the header tag. Then add a new link to the list that points to the named anchor
	$("div:not([id=nav]) " + findTag).each(function(){
		$(this).html("<a name='toc" + anchorCount + "'></a>" + $(this).html());
		List.append($("<li><a href='#toc" + anchorCount++ + "'>" + $(this).text() + "</a></li>"));
	});
	$("#" + whereGoes).append(List);
}