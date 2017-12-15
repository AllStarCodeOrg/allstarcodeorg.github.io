let timeDelay = 2000;//miliseconds
let slices = 100;

function offsetAnchor() {
	if (location.hash.length !== 0) {
		window.scrollTo(window.scrollX, window.scrollY - 50);
	}
}
// This will capture hash changes while on the page
window.addEventListener("hashchange", offsetAnchor);
// This is here so that when you enter the page with a hash,
// it can provide the offset in that case too. Having a timeout
// seems necessary to allow the browser to jump to the anchor first.
window.setTimeout(offsetAnchor, 1)

$(window).scroll(function () {
	var top_of_element = $("#pulse").offset().top;
	var bottom_of_element = $("#pulse").offset().top + $("#pulse").outerHeight();
	var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
	var top_of_screen = $(window).scrollTop();

	if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
		// The element is visible, do something
		$("#hanging_apply").hide();
	}
	else {
		// The element is not visible, do something else
		$("#hanging_apply").show();
	}
});

// Working w/stats for "totaling" visual

// Great lightweight jQuery plugin
// https://stackoverflow.com/questions/24768795/get-the-visible-height-of-a-div-with-jquery/26831113#26831113
(function($, win) {
	$.fn.inViewport = function(cb) {
	   return this.each(function(i,el) {
		 function visPx(){
		   var elH = $(el).outerHeight(),
			   H = $(win).height(),
			   r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
		   return cb.call(el, Math.max(0, t>0? Math.min(elH, H-t) : (b<H?b:H)));  
		 }
		 visPx();
		 $(win).on("resize scroll", visPx);
	   });
	};
  }(jQuery, window));

  $(".stat p").inViewport(function(px) {
	let p = $(this);
	if(px > 0 && p.hasClass("untouched")) {
	  // do this if element enters the viewport // px > 0
	  //capture data
	  p.removeClass("untouched");
	  let num = Number(p.text());
	  let oriNum = num;
	  let numPerSlice = num / slices;
	  let total = 0;
	  //set to 0
	  p.text("0");
	  
	  //setup delay
	  let myInt = setInterval(function () {
		  incNum();
	  }, timeDelay / slices);

	  let incNum = () => {
		  num -= numPerSlice;
		  total += numPerSlice
		  p.text(Math.floor(total));
		  if (Math.floor(total) >= oriNum) {
			  clearInterval(myInt);
		  }
	  }
	}
  });

// $(window).on('scroll', function () {
// 	var scrollTop = $(window).scrollTop();

// 	$(".stat p").each(function () {
		
// 	});
// }).scroll();