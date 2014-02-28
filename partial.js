/*

	{
		file: "partials/content.html",
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
		$.get(this._params.file, function(data){
			_this.process(data);
		});
		return this;
	};

	this.process = function(partial) {
		this._partialProcessed = partial;
		for (var property in this._params.values) {
			this.fill(property, this._params.values[property]);
		}
		this._completeCallback(this._partialProcessed);
	};

	this.fill = function(property, value) {
		this._partialProcessed = this._partialProcessed.replaceAll("{{" + property + "}}", value);
	};

};
