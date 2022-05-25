// TODO: ↓↓↓ remove this script ↓↓↓
// Current menu item highlithing
$(function () {
	var location = window.location.href;
	var cur_url = location.split('/').pop();

	$('.top-nav li, .mobile-top-nav li, .footer-nav li').each(function () {
		var link = $(this).find('a').attr('href');

		// console.log(link);

		if (cur_url == '') {
			cur_url = 'index.html';
		}

		if (cur_url == link)
		{
			$(this).addClass('current-menu-item');
			$(this).parents('li').addClass('current-menu-parent');
		}
	});
});


document.addEventListener('DOMContentLoaded', function(){
	// count-select-block
	$('.count-select-block').each(function(i, el){

		const input = $(el).find('input');

		$(el).find('.minus').click(function(e){
			e.preventDefault();

			let value = +$(input).val();

			if (value > 1) {
				$(input).val(--value);
			}
		});

		$(el).find('.plus').click(function(e){
			e.preventDefault();

			let value = +$(input).val();
			$(input).val(++value);
		});

	});


	// Accordions
	const toggleAccordion = (el) => {
		let closeText = 'Close accordion';
		let openText = 'Open accordtion';

		let btn = $(el).find('> .ac-header > .ac-opener');

		$(el).find('> .ac-content').stop().slideToggle(300);
		$(el).toggleClass('opened');

		if ( $(el).find('.slick-slider').length > 0 ) {
			$(el).find('.slick-slider').slick('setPosition');
		}

		if ( btn.attr('aria-expanded') == 'false' ) {
			btn.attr({
				'aria-expanded': 'true',
				'aria-label': closeText
			});
		} else{
			btn.attr({
				'aria-expanded': 'false',
				'aria-label': openText
			});
		}
	}

	$('.accordion, .js-accordion').each(function(i, el){
		$(el).find('> .ac-header, > .ac-header > .ac-opener').click(function(e){
			e.preventDefault();
			e.stopPropagation();

			toggleAccordion( $(el) );
		});

		if ($(el).hasClass('opened-on-load')) {
			$(el).find('.ac-header').trigger('click');
		}
	});

	// Forms
	$('.form-control').each(function(i, el){
		if ( $(el).find('input').length > 0 ) {
			if ( !!$(el).find('input').val() ) {
				$(el).addClass('not-empty');
			}

			$(el).find('input').on('change keyup', function(e){
				if ($(this).val() !== '') {
					$(el).addClass('not-empty');
				} else{
					$(el).removeClass('not-empty');
				}
			});

			return;
		}

		if( $(el).find('select').length > 0 ){
			if ( $(el).find('select').val() !== '' ) {
				$(el).addClass('not-empty');
			}

			$('.form-control select').change(function(){
				if ( !!$(this).val() ) {
					$(this).closest('.form-control').addClass('not-empty');
				} else{
					$(this).closest('.form-control').removeClass('not-empty');
				}
			});

			return;
		}
	});

	$('.hidden-field-block').each(function(i, el){
		$(el).find('.js-hidden-content').hide(0);

		$(el).find('.block-opener').click(function(e){
			e.preventDefault();

			$(this).slideUp(300);
			$(el).find('.js-hidden-content').slideDown(300);
		});
	});

	// Catalog view type
	$('[data-change-view]').click(function(e){
		e.preventDefault();

		$('#js-catalog-grid').attr('data-view', $(this).data('change-view'));
		$(this).addClass('active').siblings().removeClass('active');
	});

	// Tabs
	function goToTab(tabId, handler){
		if (handler == undefined) {
			handler = false;
		}

		let dest = $( tabId );
		dest.stop().fadeIn(300).siblings().hide(0);

		$('[data-tab="'+tabId+'"]').addClass('current').siblings().removeClass('current');
	}

	$("[data-tab]").click(function(e){
		e.preventDefault();
		let dest = $(this).data('tab');

		goToTab(dest, $(this));

		// $(dest).find('.slick-slider').slick('setPosition');
	});

	$(".tabs-nav").each(function(i, el){
		$(el).find('[data-tab]').eq(0).click();
	});

	$('.tabs-select').on('change', function(){
		goToTab($(this).val());
	});

	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	function equalSlideRowsHeight(slider, breakpoint){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');

			if ($(window).width() >= breakpoint) {
				$(this).find('.slick-slide > div').height('auto');

				let sizes = [];

				$(this).find('.slick-slide').each(function(i, el){
					let arr = [];
					for(let i = 0; i < 5; i++){
						let div = $(el).find('> div:nth-child(' + (i + 1) + ')');

						if (div.length == 0) {
							break;
						}

						div.each(function(j, item){
							arr.push($(item).height());
						});

						sizes[i] = [];
						sizes[i].push( getMaxOfArray(arr) );
					}
				});

				$(sizes).each(function(i, height){
					$('.slick-slide > div:nth-child(' + (i + 1) + ')').height(height);
				});
			}
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-arrow slick-prev" aria-label="Previous"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 14"><path d="M7 13 1 7l6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
		nextArrow: '<button type="button" class="slick-arrow slick-next" aria-label="Next"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 14"><path d="m1 13 6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
	}

	$('.addons-slider-wrapper').each(function(i, el){
		const slider = $(el).find('.addons-slider');

		slider.slick({
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			rows: $(window).width() >= 768 ? 2 : 1,
			arrows: true,
			appendArrows: $(el).find('.slider-nav'),
			...arrowsButtons,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});

		equalSlideRowsHeight(slider, 768);
	});

	$('.related-products-slider-wrapper').each(function(i, el){
		const slider = $(el).find('.related-products-slider');

		slider.slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			...arrowsButtons,
			appendArrows: $(el).find('.slider-nav'),
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let topNavHeight = 66;

		if ($(window).width() < 440) {
			topNavHeight = 56;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - topNavHeight
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		const isOpened = $('body').hasClass('nav-opened');

		$('.menu-opener').toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
		$('.header').toggleClass('nav-opened');
		$('body').toggleClass('nav-opened');

		if (!isOpened) {
			bodyScrolled = $(window).scrollTop();

			$('body, .header').scrollTop(bodyScrolled).css('padding-right', getScrollWidth());
		} else{
			$('body, .header').scrollTop(bodyScrolled).css('padding-right', 0);
		}
	});

	$('.mobile-top-nav').each(function(i, el){
		$(el).find('.menu-item-has-children > a').click(function(e){
			e.preventDefault();

			$(this).toggleClass('opened').siblings('.sub-menu').stop().slideToggle(300);
		});
	});

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
			? header.classList.add('sticky')
			: header.classList.remove('sticky');
		};
	}

	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Modals
	$('.modal').css('display','block');

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close, .js-modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		if ($(this).data('modal-tab') != undefined) {
			goToTab($(this).data('modal-tab'));
		}

		showModal( $(this).data('modal') );
	});

	$('[data-video-modal]').click(function(e) {
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').removeClass('vimeo youtube mp4').addClass('youtube').append('<div class="video-iframe" id="' + videoId + '"></div>');
			createVideo(videoId, videoId);
		} else if (videoType == 'vimeo') {
			$('#modal-video-iframe').removeClass('vimeo youtube mp4').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/' + videoId + '?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
		} else if (videoType == 'mp4'){
			$('#modal-video-iframe').removeClass('vimeo youtube mp4').addClass('vimeo').html(`<video src="${videoId}" playsinline autoplay controls></video>`);
		}

		hideModal('.modal');

		showModal("#video-modal");
	});

	$('.big-video-block').each(function(i, el){
		$(el).find('[data-video-id]').click(function(e){
			e.preventDefault();
			e.stopPropagation();

			let videoId = $(this).data('video-id');
			let videoType = $(this).data('video-type');

			$(el).addClass('playing');

			if (videoType == 'youtube') {
				$(el).append('<div class="video-iframe" id="'+videoId+'"></div>');
				createVideo(videoId, videoId);
			}
		});
	});

	var player;

	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				// 'autoplay':1,
				'autohide': 1,
				'showinfo': 0,
				'rel': 0,
				'loop': 1,
				'playsinline': 1,
				'fs': 0,
				'allowsInlineMediaPlayback': true
			},
			events: {
				'onReady': function(e) {
					// e.target.mute();
					// if ($(window).width() > 991) {
					setTimeout(function() {
						e.target.playVideo();
					}, 200);
					// }
				}
			}
		});
	}
});


function getScrollWidth() {
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;

function showModal(modal) {
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').addClass('modal-visible')
		.scrollTop(bodyScrolled)
		.css('padding-right', getScrollWidth());
}

function hideModal(modal) {
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').removeClass('modal-visible')
		.scrollTop(bodyScrolled)
		.css('padding-right', 0);
}