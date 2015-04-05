(function() {

	function NavSlider(selector, settings) {

		var self = this;

		var container = document.querySelector(selector);
		var pages = [], shownPages = [], page, shownPage;
		var fillToY, fillPath;

		var i = 0;

		this.curPage = 0;

		this.r 	= settings.cr || 10;
		this.lw = settings.lw || 4;
		this.lh = settings.lh || 50;
		this.n 	= settings.n  || 5;


		this.paper = new Raphael(container, 2 * this.r, this.lh * (this.n));

		this.paper.path(['M', this.r, this.r, 'L', this.r, this.r + this.lh * (this.n - 1)]).attr({ 
			'stroke-width': this.lw, stroke: 'gray' 
		});

		fillPath = ['M', this.r, this.r, 'L', this.r, this.r];
		this.fillPathRender = this.paper.path(fillPath).attr({
			stroke: 'red',
			'stroke-width': this.lw
		});

		for(; i < this.n; i++) {
			page = this.paper.circle(this.r, this.r + (i * this.lh), this.r - 1).attr({ fill: 'gray', stroke: 'none' });
			shownPage = page.clone().attr({fill: 'red', r: i != 0 ? 0 : this.r});
			shownPages.push(shownPage);
			pages.push(page);
		}

		this.shownPages = shownPages;

		function pageOnClick(to) {
			return function() {
				self.fillTo(to);
			}
		}

		for(var i = 0; i < pages.length; i++) {
			console.log(pages[i].attr('cy'));
			pages[i].click(pageOnClick(i));
			shownPages[i].click(pageOnClick(i))
		}
	}

	NavSlider.prototype.fillTo = function(to) {

		if(to == this.curPage) return;

		var self = this;
		var t = 100 / Math.abs(to - self.curPage);
		var y, f = (to - self.curPage) / Math.abs(to - self.curPage);

		var i = self.curPage;

		function animateTo(i) {

			if(i == to + f) {
				self.curPage = i - f;
				return;
			}

			y = i * self.lh;

			var trans = Raphael.transformPath(['M', self.r, self.r, 'L', self.r, self.r + y]);
			self.fillPathRender.animate({ path: trans }, t, function() {

				if(f < 0) {
					if(i != to) self.shownPages[i].animate({r: 0}, 200);
				} else {
					self.shownPages[i].animate({r: self.r}, 200);
				}

				animateTo(i += f);
			});
		};

		animateTo(i);
	};

	window.NavSlider = NavSlider;
})();