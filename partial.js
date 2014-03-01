/*

	{
		file: "partials/content.html",
		data: "<div>{{nome}}</div>",
		values: {
			name: "My partial"
		}
	}

*/

String.prototype.replaceAll = function(from, to){
    var str = this;
    var pos = str.indexOf(from);
    while (pos > -1){
		str = str.replace(from, to);
		pos = str.indexOf(from);
	}
    return (str);
}

function Partial(params) {
	this._params = params;
	this._partialProcessed = "";

	this.load = function(callback) {
		this._completeCallback = callback;
		var _this = this;
		if (this._params.data != undefined) {
			this.process(this._params.data); 
		} else {
			$.get(this._params.file, function(data){
				_this.process(data);
			});
		}		
		return this;
	};

	this.process = function(partial) {
		/* First it will process all subpartials if exist */
		this._partialProcessed = partial;
		this.processAllPartials();
		for (var property in this._params.values) {
			this.fill(property, this._params.values[property]);
		}
		this._completeCallback(this._partialProcessed);
	};

	this.processAllPartials = function() {
		if (this._params.partials != undefined) {
			for (var i = 0; i < this._params.partials.length; i++) {
				this.loadAndProcessPartial(this._params.partials[i]);
			}
		}
	}

	this.loadAndProcessPartial = function(partial) {		
		if (partial.data != undefined) {
			this.processPartial(partial, partial.data);
		} else {
			var _this = this;
			$.get(partial.file, function(data){
				_this.processPartial(partial, data);
			});
		}		
	}

	this.processPartial = function(partial, data) {
		var processed = "";
		for (var i = 0; i < partial.values.length; i++) {
			var preProcessed = data;
			for (var property in partial.values[i]) {
				preProcessed = this.fillWith(preProcessed, property, partial.values[i][property]);
			}
			processed += preProcessed;
		}
		this.fill(partial.name, processed);
	};

	this.fillWith = function(data, property, value) {
		return data.replaceAll("{{" + property + "}}", value);
	}

	this.fill = function(property, value) {
		this._partialProcessed = this._partialProcessed.replaceAll("{{" + property + "}}", value);
	};

};