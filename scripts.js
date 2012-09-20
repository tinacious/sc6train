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
					jQuery('html,body').animate({scrollTop: targetOffset - 30}, $scrollTime);
					//setTimeout(updateUrl, $scrollTime + 100)
					return false;
				}
			}
		});
	});


	// All links in a new window
	$("#content a").attr('target','_blank');
	// $("#content a").after("<img src='img/new-window.png' class='new_win' />");
	$("#content a").after("<span class='new_win'>&nbsp;&nbsp;&nbsp;</span>");


	


	// Table of Contents generation
	buildTOC('h2','nav'); 



	// To Table of Contents button
	$('#gotonav_desktop').hide();
	$(function(){
		var menuOffset = $('#content')[0].offsetTop;
		$(document).bind('ready scroll',function(){
			var docScroll = $(document).scrollTop();
			if(docScroll >= menuOffset){
				$('#gotonav_desktop').show();
			} else {
				$('#gotonav_desktop').hide();
			}
		});
	});

	

	


	// Automagically generate image captions and titles using alt tags

	$('#content img:not([class=new_win])').each(function(){
		var imgCaption = $(this).attr('alt');
		$(this).after("<span class='caption'>" + imgCaption + "</span>");
		$(this).attr('title', imgCaption);
	});


	// Go-to Table of Contents button control for desktop

	var winWidth = $(window).width();
	if (winWidth<720) {
		$('#gotonav_desktop span').hide();
	} else {
		$('#gotonav_desktop span').show();
	}

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