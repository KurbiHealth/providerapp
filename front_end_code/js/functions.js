;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		// Add class if has dropdown
		$('nav[class^=nav] li').each(function() {
			var $this = $(this);
			if ( $this.find('ul').length ) {
				$this.addClass('has-dropdown');
			};
		});

		// Show nav
		$('.nav-trigger').on('click', function(event) {
			event.preventDefault();

			$(this).toggleClass('active');
			setTimeout(function() {
				$('.nav').toggleClass('active');
			}, 300);
		});

		// Tabs
		(function(){
		    // This class will be added to active tab link 
		    // and the content container
		    var activeTabClass = 'current';
		    
		    $('.tabs-nav a').on('click', function(event) {
		        var $tabLink = $(this);
		        var $targetTab = $($tabLink.attr('href'));
		 
		        $tabLink
		            .parent() // go up to the <li> element
		            .add($targetTab)
		            .addClass(activeTabClass)
		                .siblings()
		                .removeClass(activeTabClass);
		        
		        event.preventDefault();
		    });
		})();

		// Focus search
		$('.search label').on('click', function() {
			$(this).closest('.search').addClass('active');
			$('.search-field').focus();
		});

		// Show conversation details
		$('.list-posts a').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.container-inner').addClass('inactive');
			$('.section-post').addClass('active');
			
			setTimeout(function() {
				$('.section-post').addClass('transition');
			}, 100);

			$('html, body').animate({
				scrollTop: 0
			}, 300);
		});

		$('.link-back').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.section-post').removeClass('active transition');
			$('.container-inner').removeClass('inactive');
		});

		// Show options panel
		$('.link-options').on('click', function(event) {
			event.preventDefault();

			$(this).closest('.article-options').toggleClass('active');
		});

		// Open respond prompt
		$('.link-respond').on('click', function(event) {
			event.preventDefault();

			$('#popup-prompt').addClass('active');
			$('.wrapper').addClass('active');
		});

		$('.link-close').on('click', function(event) {
			event.preventDefault();

			$('.popup').removeClass('active');
			$('.wrapper').removeClass('active');
		});

		// Reply popup
		$('.link-reply').on('click', function(event) {
			event.preventDefault();

			$('#popup-reply').addClass('active');
			$('#popup-prompt').removeClass('active');
		});

		// Minimize response
		$('.link-minimize').on('click', function(event) {
			event.preventDefault();

			$(this).toggleClass('minimized');
			$(this).closest('.popup').toggleClass('minimized');
		})

		// Close nav on doc click
		$doc.on('click', function(event) {
			var $target = $(event.target);

			if (!$target.is('.nav-trigger, .nav-trigger *, .nav, .nav *')) {
				$('.nav-trigger').removeClass('active');
				setTimeout(function() {
					$('.nav').removeClass('active');
				}, 300);
			}

			if (!$target.is('.search, .search *')) {
				$('.search').removeClass('active');
			};

			if (!$target.is('.article-options, .article-options *')) {
				$('.article-options').removeClass('active');
			};
		});
	});

})(jQuery, window, document);
