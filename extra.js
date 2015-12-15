var loopEvents = {
	_frameTaken : new Array,
	_listener : new Array,
	_time : new Array,
	_topIndex : 0,
	addListener : function(functionToBeCalled,time){
		this._listener.push(functionToBeCalled);
		this._frameTaken.push(Date.now());
		this._time.push(time);
		return this._topIndex++;
	},
	removeListener : function(index){
		this._listener.slice(index);
		this._frameTaken.slice(index);
		this._time.slice(time);
		this._topIndex--;
	},
	update : function(dt){
		for(var i=0;i<this._topIndex;i++){
			if(Date.now() > this._frameTaken[i] + this._time[i]){
				this._listener[i]();
				this._frameTaken[i] = Date.now();
			}
		}			
	}
}
var input = {
	_pressed: {},
	_frameTaken: {},
	_listener: {},	
	_pressedRecently: {},
	isDown: function(keyCode){
			return this._pressed[keyCode];		
	},
	onKeyDown: function(event){
		if(this._frameTaken[event.keyCode] == undefined || Date.now() > this._frameTaken[event.keyCode] + 100){
			this._frameTaken[event.keyCode] = Date.now();
			if(this._listener[event.keyCode] != undefined){
				this._listener[event.keyCode]();	
		}
		}
		this._pressed[event.keyCode] = true;
	},
	onKeyUp: function(event){
		this._pressed[event.keyCode] = false;
	},
	addListener: function(functionToBeCalled,keyCode){
		this._listener[keyCode] = functionToBeCalled;
	}
}
document.addEventListener('keyup',function(event){input.onKeyUp(event);},false)
document.addEventListener('keydown',function(event){input.onKeyDown(event);},false)
