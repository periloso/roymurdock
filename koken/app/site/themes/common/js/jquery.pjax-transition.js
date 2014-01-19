(function($) {

	$.pjaxTransition = function(options) {

		if (!$.support.pjax) return;

		var defaults = {
			container: '.pjax-transition-container',
			linkSelector: 'a',
			transition: false,
			beforeTransition: false,
			duration: 500,
			animateHistory: false,
			loadWhileAnimating: false
		}

		options = $.extend({}, defaults, options);

		if (!options.transition) {
			// Default to a fade

			// Set duration to half so that the entire transition
			// ends up being (close to) the original duration setting
			options.duration /= 2;

			options.transition = function() {
				this.next.css('opacity', 0).appendTo(this.current.parent());
				this.current.remove();

				this.fire('start');

				this.next.animate({ opacity: 1 }, options.duration, $.proxy(function() {
					this.done();
				}, this));
			}

			options.beforeTransition = function() {
				this.current.fadeOut(options.duration, $.proxy(function() {
					this.continue();
				}, this));
			}
		}

		var first = $(options.container + ':first');
		first.addClass('pjax-container-current');

		// Need to setup and fill staging div with initial value of container
		// so that back button works.
		$('<div />')
			.attr('id', 'pjax-container-staging')
			.css('display', 'none')
			.html($('.pjax-container-current').clone())
			.appendTo('body');

		// API object to pass to transition functions
		var api = {
			ready: false,
			context: first.parent(),
			scriptTag: false,
			fire: function(name) {
				this.context.trigger('pjax:transition:' + name);
			},
			continue: function() {
				if (this.ready && this.next) {
					this.next.addClass('pjax-container-current');
					options.transition.apply(this, [ options ]);
				} else {
					this.ready = true;
				}
			},
			done: function() {
				this.insertScripts();
				this.fire('end');
				this.ready = false;
				this.next = false;
			},
			insertScripts: function() {
				if (this.scriptTag) {
					this.next.append(this.scriptTag);
					this.scriptTag = false;
				}
			}
		}

		// Keep track of whether the current pjax is a popState event.
		// We only want to react to pjax:end if it is.
		var isPop = false;
		$(document).on('pjax:popstate', function() {
			isPop = true;
		});

		$(document).on('pjax:start', function() {
			api.current = $('.pjax-container-current:first');
			api.fire('begin');
			if (typeof options.beforeTransition === 'function' && options.loadWhileAnimating) {
				options.beforeTransition.apply(api, [ options ]);
			} else {
				api.ready = true;
			}
		});

		$(document).on('pjax:success pjax:end', function(event, xhr, pjaxOptions) {
			// Only respond to pjax:end when browser's forward/back button is used
			if (event.type === 'pjax:end' && !isPop) return;
			isPop = false;

			// setTimeout here to give pjax popState a chance to render.
			// Could probably use requestAnimationFrame here but lazy.
			setTimeout(function() {
				api.next = $('#pjax-container-staging').find(options.container).clone();

				// Remove scripts. We'll reinsert them in api.insertScripts once the element
				// has been moved out of the staging area.
				var scripts = api.next.find('script');
				if (scripts.length) {
					api.scriptTag = $('<script/>');
					scripts.each(function() {
						api.scriptTag.append($(this).html());
					});
					scripts.remove();
				} else {
					api.scriptTag = false;
				}

				if (event.type === 'pjax:end' && !options.animateHistory) {
					api.next.addClass('pjax-container-current');
					api.current.replaceWith(api.next);
					api.done();
					api.fire('restore');
				} else {
					if (options.loadWhileAnimating || typeof options.beforeTransition !== 'function') {
						api.continue();
					} else {
						options.beforeTransition.apply(api, [ options ]);
					}
				}
			}, 0);
		});

		$(document).pjax(options.linkSelector, '#pjax-container-staging');
	}

})( jQuery );