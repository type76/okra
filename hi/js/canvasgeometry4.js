THREE.CanvasGeometry = function (canvas, depth, hasOpacity, material, bumpCanvas, maxDepth) {
	THREE.Geometry.call( this );
	const ctx = canvas.getContext('2d');
	const bumpCtx = bumpCanvas ? bumpCanvas.getContext('2d') : undefined;
	const w = canvas.width;
    const h = canvas.height;
	this.materials = [];
	this.opacitys = [];
	const cache = [];
	const bumpCache = [];
	const that = this;
	let _depth;
	for(var x=0;x<w;x++) {
		if(!cache[x]) {
			cache[x] = [];
		}
		bumpCache[x] = [];
		for(var y=0;y<h;y++) {
			let bumpData;
			if(bumpCanvas) {
				const isBumpCached = bumpCache[x][y];
				bumpData = isBumpCached ? bumpCache[x][y] : _getBumpData(x, y, 1, 1);
				_depth = maxDepth * bumpData[0]/255;
			} else {
				_depth = depth;
			}
			const isCached = cache[x][y];
			const data = isCached ? cache[x][y] : _getImageData(x, y, 1, 1);
			cache[x][y] = data;
			if(data[3] !== 0) {
				var vectors = [];
				var v = new THREE.Vector3();
				var f = new THREE.Face3();
				f.color.setStyle("rgb("+data[0]+","+data[1]+","+data[2]+")");
				if(hasOpacity) {
					if(this.opacitys.indexOf(data[3]/255) == -1) {
						this.opacitys.push(data[3]/255);
						var materialClone = material.clone();
						materialClone.transparent = true;
						materialClone.opacity = data[3]/255;
						this.materials.push(materialClone);
					}
					f.materialIndex = this.opacitys.indexOf(data[3]/255);
				}

				_handleVertices([
					[x/w, -y/w, 0],
					[(x+1)/w, -y/w, 0],
					[(x+1)/w, (-y+1)/w, 0],
					[x/w, (-y+1)/w, 0],
					[x/w, -y/w, _depth],
					[(x+1)/w, -y/w, _depth],
					[(x+1)/w, (-y+1)/w, _depth],
					[x/w, (-y+1)/w, _depth]
				])

				f.set(vectors[2], vectors[1], vectors[0]);
				this.faces.push(f.clone());
				
				f.set(vectors[0], vectors[3], vectors[2]);
				this.faces.push(f.clone());
				
				f.set(vectors[4], vectors[5], vectors[6]);
				this.faces.push(f.clone());
				
				f.set(vectors[6], vectors[7], vectors[4]);
				this.faces.push(f.clone());

				if(x-1 < 0 || _getImageData(x-1, y)[3] == 0 || bumpData) {
					vectors = [];
					_handleVertices([
						[x/w, -y/w, 0],
						[x/w, (-y+1)/w, 0],
						[x/w, (-y+1)/w, _depth],
						[x/w, -y/w, _depth]
					]);
					
					f.set(vectors[2], vectors[1], vectors[0]);
					this.faces.push(f.clone());
					f.set(vectors[0], vectors[3], vectors[2]);
					this.faces.push(f.clone());
				}
				if(x+1 > w || _getImageData(x+1, y)[3] == 0 || bumpData) {
					vectors = [];
					_handleVertices([
						[(x+1)/w, -y/w, 0],
						[(x+1)/w, (-y+1)/w, 0],
						[(x+1)/w, (-y+1)/w, _depth],
						[(x+1)/w, -y/w, _depth]
					]);
					
					f.set(vectors[0], vectors[1], vectors[2]);
					this.faces.push(f.clone());
					f.set(vectors[2], vectors[3], vectors[0]);
					this.faces.push(f.clone());
				}
				if(y+1 > h || _getImageData(x, y+1)[3] == 0 || bumpData) {
					vectors = [];
					_handleVertices([
						[x/w, (-y)/w, 0],
						[(x+1)/w, (-y)/w, 0],
						[(x+1)/w, (-y)/w, _depth],
						[x/w, (-y)/w, _depth]
					])
					
					f.set(vectors[0], vectors[1], vectors[2]);
					this.faces.push(f.clone());
					f.set(vectors[2], vectors[3], vectors[0]);
					this.faces.push(f.clone());
				}
				if(y-1 < 0 || _getImageData(x, y-1)[3] == 0 || bumpData) {
					vectors = [];
					_handleVertices([
						[x/w, (-y+1)/w, 0],
						[(x+1)/w, (-y+1)/w, 0],
						[(x+1)/w, (-y+1)/w, _depth],
						[x/w, (-y+1)/w, _depth]
					]);
					
					f.set(vectors[0], vectors[3], vectors[2]);
					this.faces.push(f.clone());
					f.set(vectors[2], vectors[1], vectors[0]);
					this.faces.push(f.clone());
				}
			}
		}
	}

	// console.log(this)	
	this.mergeVertices();
	this.computeFaceNormals();
	this.computeVertexNormals();

	function _getImageData(_x,_y) {
		const isCached = cache[_x] && cache[_x][_y];
		const data = isCached ? cache[_x][_y] : ctx.getImageData(_x, _y, 1, 1).data;
		if(!isCached) {
			if(!cache[_x])cache[_x] = [];
			cache[_x][_y] = data;
		}
		return cache[_x][_y];
	}
	function _getBumpData(_x,_y) {
		const isBumpCached = bumpCache[_x] && bumpCache[_x][_y];
		const data = isBumpCached ? bumpCache[_x][_y] : bumpCtx.getImageData(_x, _y, 1, 1).data;
		if(!isBumpCached) {
			if(!bumpCache[_x])bumpCache[_x] = [];
			bumpCache[_x][_y] = data;
		}
		return bumpCache[_x][_y];
	}
	function _handleVertices(arr){
		arr.forEach(n=>{
			v.set(...n);
			that.vertices.push(v.clone());
			vectors.push(that.vertices.length-1);
		})
	}
};