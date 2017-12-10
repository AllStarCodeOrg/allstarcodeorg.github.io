		function offsetAnchor() {
			if(location.hash.length !== 0) {
				window.scrollTo(window.scrollX, window.scrollY - 50);
			}
		}
		// This will capture hash changes while on the page
		window.addEventListener("hashchange", offsetAnchor);
		// This is here so that when you enter the page with a hash,
		// it can provide the offset in that case too. Having a timeout
		// seems necessary to allow the browser to jump to the anchor first.
		window.setTimeout(offsetAnchor, 1)

		$(window).scroll(function() {
			var top_of_element = $(".pulse").offset().top;
			var bottom_of_element = $(".pulse").offset().top + $(".pulse").outerHeight();
			var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
			var top_of_screen = $(window).scrollTop();
		
			if((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
				// The element is visible, do something
				$("#hanging_apply").hide();
			}
			else {
				// The element is not visible, do something else
				$("#hanging_apply").show();
			}
		});