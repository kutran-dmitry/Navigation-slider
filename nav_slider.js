(function() {

	console.log(1);

	var PREFIX 	  = 'nav-slider',
		NODE_SIZE = 20,
		INACTIVE_COLOR  = 'gray',
		ACTIVE_COLOR	= 'red';
		LINK_LENGTH		= 30;
		LINK_WIDTH		= 5;

	var Node = function() {
		var node = document.createElement('div');
		node.type = PREFIX + '-node';

		node.style.position = 'relative';

		node.style.width = NODE_SIZE + 'px';
		node.style.height = NODE_SIZE + 'px';
		node.style.borderRadius = (NODE_SIZE / 2) + 'px';
		node.style.backgroundColor = INACTIVE_COLOR;
		node.style.zIndex = 2;
		node._active = false;

		Object.defineProperty(node, 'active', {
			get: function() {
				return this._active;
			},
			set: function(val) {
				if(val) node.style.backgroundColor = ACTIVE_COLOR;
				else node.style.backgroundColor = INACTIVE_COLOR;
				this._active = val;
			}
		});

		return node;
	};

	var Link = function() {
		var link = document.createElement('div');
		link.type = PREFIX + '-link';

		link.style.position = 'relative';

		link.style.left = ((NODE_SIZE - LINK_WIDTH) / 2) + 'px';

		link.style.width = LINK_WIDTH + 'px';
		link.style.height = LINK_LENGTH + 'px';
		link.style.backgroundColor = INACTIVE_COLOR;
		link.style.zIndex = 0;
		link._active = false;

		Object.defineProperty(link, 'active', {
			get: function() {
				return this._active;
			},
			set: function(val) {
				if(val) link.style.backgroundColor = ACTIVE_COLOR;
				else link.style.backgroundColor = INACTIVE_COLOR;
				this._active = val;
			}
		});

		return link;
	};

	function NavSlider(selector, n) {
		var el = document.querySelector(selector),
			i  = 1,
			nodes = [],
			curNode;

		nodes.push({ node: new Node(), link: null });

		for(; i < n; i++) {
			nodes.push({
				node: new Node(),
				link: new Link()
			});
		}

		// displaying
		for(i = 0; i < n; i++) {
			curNode = nodes[i];
			if(curNode.link) {
				el.appendChild(curNode.link);
			}

			el.appendChild(curNode.node);
		}

		this.nodes = nodes;
	}

	NavSlider.prototype.to = function(nodeId) {
		var i = 0, curNode;

		for(var i = 0; i < nodeId; i++) {
			curNode = this.nodes[i];
			if(curNode.link) {
				curNode.link.active = true;
			}

			curNode.node.active = true;
		}

		for(var i = nodeId; i < this.nodes.length; i++) {
			curNode = this.nodes[i];
			curNode.link.active = false;
			curNode.node.active = false;
		}
	};

	window.NavSlider = NavSlider;
})();