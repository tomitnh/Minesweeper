class Cell {
	// A cell can either be blank, a bee, or a number, 
	// when revealed. And be another color or flagged if 
	// not revealed.
	constructor (pos, width) {
		this.bee = Math.random() < 0.3 ? true : false;
		this.revealed = true;
		this.width = width;
		this.pos = pos;
		this.neighborBees = null;
	}

	// count the number of bees around this cell
	countNeighborBees () {
		var row = Math.floor(this.pos.y / cellSize);
		var col = Math.floor(this.pos.x / cellSize);
		var total = 0;
		for (var i = -1 ; i <= 1; i++) {
			for (var j = -1 ; j <= 1; j++) {
				// Check for array out of bound
				var r = row + i;
				var c = col + j;
				if ( r < 0 || r >= grid.length || c < 0 || c >= grid.length) {
					// do nothing
				}

				else if (grid[r][c].bee) {
					total++;
				}
			}
		}

		return total;
	}

	reveal () {
		this.revealed = true;
		this.neighborBees = this.countNeighborBees();
	}

	// Render the cell
	show () {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');

		if (this.revealed) {
			ctx.fillStyle = 'beige';
			ctx.fillRect(this.pos.x, 
				this.pos.y, 
				this.width, 
				this.width);

			ctx.fillStyle = 'black';
			ctx.font = '24px san-serif';
			ctx.textAlign = 'center';
			ctx.fillText(this.neighborBees, 
				this.pos.x + this.width/2, 
				this.pos.y + 5 + this.width/2);
			

			if (this.bee) {
				ctx.drawImage(beeImg,
					0,
					0,
					beeImg.width,
					beeImg.height,
					this.pos.x,
					this.pos.y,
					this.width * 0.9,
					this.width * 0.9
					);
			}

		} else {
			ctx.fillStyle = 'lightgrey';
			ctx.fillRect(this.pos.x, 
				this.pos.y, 
				this.width, 
				this.width);

			ctx.lineWidth = '2';
			ctx.strokeRect(this.pos.x, 
				this.pos.y, 
				this.width, 
				this.width);

			ctx.lineWidth = '1';	// shadow
			ctx.strokeStyle = 'grey';
			ctx.strokeRect(this.pos.x+1, 
				this.pos.y+1, 
				this.width-2, 
				this.width-2);
		}
	}
}