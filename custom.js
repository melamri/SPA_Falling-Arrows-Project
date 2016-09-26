/*global $, jQuery, console, ga, $window */

function hideGenesis() {
	"use strict";
	$(".genesis").hide();
}

// genesis function
//================================================== 
$(document).ready(function () {
	"use strict";
	if (window.location.hash === ('')) {
		//$(".genesis").hide();
		$("body, html").addClass("noScroll");
		$("body, html").bind('touchmove', function (e) {e.preventDefault(); });
		$(".genesis-fap").fadeIn(1500).delay(1250);
		setInterval(function () {$("body, html").removeClass("noScroll"); }, 4250);
		setInterval(function () {$("body, html").unbind('touchmove'); }, 4250);

		$(".genesis-fap").fadeOut(1500, function () {
			$("#wrapper").hide();
			$(".genesis").hide();
			$(".bannerArrowhead").hide();
			$("#wrapper").fadeIn(1500);
			$(".bannerArrowhead").delay(750).fadeIn(1500);
		});
	} else {
		setTimeout(hideGenesis, 200);
		
	}
});

// carousel interval
//================================================== 
$('.carousel').carousel({
  interval: 10000
});

// initialize popovers
//==================================================
$(function () {
	"use strict";
  $('[data-toggle="popover"]').popover();
});
$(".lithic-popover").popover({trigger: "manual", html: true, animation: false}).on("mouseenter", function () {
	"use strict";
	/*jslint nomen: true*/
	var _this = this;
	$(this).popover("show");
	$(".popover").on("mouseleave", function () {
		$(_this).popover("hide");
	});
	/*jslint nomen: false*/
}).on("mouseleave", function () {
	"use strict";
	/*jslint nomen: true*/
	var _this = this;
	setTimeout(function () {
		if (!$(".popover:hover").length) {
			$(_this).popover("hide");
		}
	}, 300);
	/*jslint nomen: false*/
});

// set distance user needs to scroll before fade in navbar
//================================================== 
$(function () {
	"use strict";
	$(window).scroll(function () {
		if ($(this).scrollTop() > 220) {
			$('#fixed-nav').fadeIn(500);
		} else {$('#fixed-nav').fadeOut(500); }
	});
});

function gaTab(tab) {
	"use strict";
	if (tab === '/#home') {
		ga('set', 'page', '/');
		ga('send', 'pageview');
	} else {
		ga('set', 'page', tab);
		ga('send', 'pageview');
	}
}
$(document).ready(function () {
	//activate tab based on anchor, page reloads or links
	"use strict";
	if (location.hash) {
		$('a[href=' + location.hash + ']').tab('show');
		$('html, body').stop().animate({scrollTop: 0}, 400);
		$.fn.resetAnim();
		gaTab('/' + location.hash);
  }
	//update hash based on tab
	$(document.body).on("click", "a[data-toggle]", function (event) {
		if (this.getAttribute("href") !== (null)) {
			location.hash = this.getAttribute("href");
			$('html, body').stop().animate({scrollTop: 0}, 400);
			$.fn.resetAnim();
			gaTab('/' + location.hash);
		}
	});
	//return to past tab on history back (activate location hash if exists or the default home tab if no hash exists)
	$(window).on('popstate', function () {
		var anchor = location.hash || $("a[data-toggle=tab]").first().attr("href");
		$('a[href=' + anchor + ']').tab('show');
		//console.log("C");
	});
	var delay = 400;
	setTimeout(function () {
		$.fn.resetAnim();
	}, delay);
});


// change the banner in tabs navbar
//================================================== 
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	"use strict";
	var target = $(e.target).attr("href");  // activated tab
	if (target === "#home") {
		$("#first-banner").hide();
		$(".tabs-nav").hide();
	} else {
		$("#first-banner").show();
		$(".tabs-nav").show();
	}
	if (target === "#mission") {
		$("#banner").attr("src", "media/mission/rocks.jpg");
	} else if (target === "#artwork") {
		$("#banner").attr("src", "media/artwork/sand.jpg");
	} else if (target === "#lithics") {
		$("#banner").attr("src", "media/lithics/oaxaca.jpg");
	} else if (target === "#artist") {
		$("#banner").attr("src", "media/artist/trees.jpg");
	}
});

// click handler to close fixed navbar after use
//==================================================
$('.navbar-collapse').click('a', function () {
	"use strict";
	$('.navbar-collapse').collapse('hide');
});

// hover transformations
//================================================== 
$(function () {
	"use strict";
	$('.card, .lithic-card-image').hover(
		function () {
			$(this).find(".card-image").addClass("fade-out  scale-up");
			$(this).find(".card-text").addClass("fade-in");
			$(this).find(".lithic-card-text").addClass("fade-in");
			$(this).find(".card-text-hor").addClass("fade-color").css("background-color", $(this).find(".card-text-hor").attr('data-color'));
			//if ($(this).parent().hasClass("lithic-content")) {$(this).parent().addClass("scale-up"); }
		},
		function () {
			$(this).find(".card-image").removeClass("fade-out  scale-up");
			$(this).find(".card-text").removeClass("fade-in");
			$(this).find(".lithic-card-text").removeClass("fade-in");
			$(this).find(".card-text-hor").css("background-color", "");
			$(this).find(".card-text-hor").removeClass("fade-color");
			//if ($(this).parent().hasClass("lithic-content")) {$(this).parent().removeClass("scale-up"); }
		}
	);
	$('.card-small').hover(
		function () {
			$(this).find(".card-image-small").addClass("fade-in scale-up");
			$(this).find(".card-sold").addClass("fade-in scale-up");
		},
		function () {
			$(this).find(".card-image-small").removeClass("fade-in scale-up");
			$(this).find(".card-sold").removeClass("fade-in scale-up");
		}
	);
});

// text animations
//==================================================
$(function () {
  "use strict";
	$('.italDelayed').textillate({initialDelay: 2300}); //2300
	$('.delayed').textillate({initialDelay: 400});
});

// modal data
//==================================================
$('#PieceModal').on('show.bs.modal', function (event) {
  "use strict";
	
	
	var button = $(event.relatedTarget), // Button that triggered the modal
		modal = $(this),
		sold = button.data('sold'),
		title = button.data('title'),
		year = button.data('year'),
		image = button.data('image'),
		type = button.data('type'),
		materials = button.data('materials'),
		dimensions = button.data('dimensions'),
		original = button.data('original'),
		campaign = button.data('campaign'),
		description = button.data('description'),
		align = button.data('align');
  	
  modal.find('.modal-body #piece-title').text(title);
  modal.find('.modal-body #piece-year').text(year);
	modal.find('.modal-body #pieceimg img').attr("src", "");
  modal.find('.modal-body #pieceimg img').attr("src", image);
  modal.find('.modal-body #piece-type').text(type + ': ');
  modal.find('.modal-body #piece-materials').text(materials);
  modal.find('.modal-body #piece-dimensions').text(dimensions);
	
  if (sold) {
    modal.find('.modal-body #available').hide();
    modal.find('.modal-body #reserve').hide();
    modal.find('.modal-body #unavailable').show();
    modal.find('.modal-body #unavailable-msg').text('SOLD');
  } else {
    modal.find('.modal-body #unavailable').hide();
    modal.find('.modal-body #reserve').show();
    modal.find('.modal-body #available').show();
    modal.find('.modal-body #piece-original').text('$' + original);
    modal.find('.modal-body #piece-campaign').text('$' + campaign);
  }
  
  modal.find('.modal-body #piece-description').text(description);
  
  if (align === "horizontal") {
    $('.hor').show();
    $('.ver').hide();
  } else if (align === "vertical") {
    $('.ver').show();
    $('.hor').hide();
  }
  
  document.getElementById('piece').value = title;
	
	//$("#reserve").css('display', 'none');
	
	//$("#modal-content").scrollTop(0);
});

// submit popover
//==================================================
$(function () {
	"use strict";
	$('#send_btn').popover({title: 'Thank you!', content: 'We will contact you within 24 hours for confirmation.'}, 'click');
});

// sold function
//==================================================
/*$(function () {
  "use strict";
	$('img.artwork-thum').each(function () {
    var $this = $(this),
			$parent = $this.parent();
    if ($parent.data('sold')) {
      $this.removeClass('card-image-small').addClass('card-sold');
    } else {
      $this.addClass('card-image-small').removeClass('card-sold');
    }
  });
});*/


/* @preserve
 * modal scroll fix. http://codepen.io/dimbslmh/full/mKfCc/
 */
$(function ($) {
	function setModalMaxHeight(element) {
		this.$element     = $(element);
		this.$content     = this.$element.find('.modal-content');
		var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight(),
			dialogMargin  = $(window).width() < 768 ? 20 : 60,
			contentHeight = $(window).height() - (dialogMargin + borderWidth),
			headerHeight  = this.$element.find('.modal-header').outerHeight() || 0,
			footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0,
			maxHeight     = contentHeight - (headerHeight + footerHeight);

		this.$content.css({
			'overflow': 'hidden'
		});

		this.$element.find('.modal-body').css({
			'max-height': maxHeight,
			'overflow-y': 'auto'
		});
	}
	$('.modal').on('show.bs.modal', function () {
		$(this).show();
		setModalMaxHeight(this);
	});
	$(window).resize(function () {
		if ($('.modal.in').length !== 0) {
			setModalMaxHeight($('.modal.in'));
		}
	});
	//$("#modal-content").scrollTop($("#modal").offset().top);
});

// check if element is in view (vertically, towards bottom of page)
//==================================================
$.fn.isvisible = function () {
	"use strict";
	var $this = $(this),
		$window = $(window),
		winBottom = $window.scrollTop() + $window.height(),
		thisTop = $this.offset().top,
		thisBottom = thisTop + $this.height(),
		inBottom = winBottom <= thisTop;
	return (!inBottom);
};

function isIE() {
	"use strict";
	var ua = window.navigator.userAgent,
		msie = ua.indexOf("MSIE ");
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {return true; }
}

$.fn.resetAnim = function () {
	"use strict";
	var $window = $(window),
		$cards = $(".appear");
	if (isIE()) {
		return;
	} else {
		$cards.css('visibility', 'hidden');
	}
	$cards.each(function (i, el) {
		var element = $(el);
		if (element.isvisible()) {
			element.removeClass("in-view");
			element.removeClass("enter-view");
		}
	});
};

// animate on scroll
//==================================================
$(function ($) {
	"use strict";
	var ua = window.navigator.userAgent,
		msie = ua.indexOf("MSIE "),
		$window = $(window),
		cards = $(".appear");
	//
	if (isIE()) {
		return;
	} else {// If another browser, return 0
		cards.css('visibility', 'hidden');
	}
	cards.each(function (i, el) {
		var element = $(el);
		if (element.isvisible()) {
			element.addClass("in-view");
			element.css('visibility', 'visible');
		}
	});

	$window.scroll(function (event) {
		cards.each(function (i, el) {
			var element = $(el);
			if (element.isvisible()) {
				element.addClass("enter-view");
				element.css('visibility', 'visible');
			}
		});
	});
});

