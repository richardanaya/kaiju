var Controller = function(){
    this.screen = new Screen();
    this.setupEvents();
    this.currentTool = new Pen(this);
};

Controller.prototype.setupEvents = function() {
    var c = $('canvas');
    c.mousedown(_.bind(this.onMouseDown,this));

    c.mousemove(_.bind(this.onMouseMove,this));

    c.mouseup(_.bind(this.onMouseUp,this));
};

Controller.prototype.onMouseDown = function(evt){
    var p = new Point(evt.clientX,evt.clientY);
    console.log(p);
};

Controller.prototype.onMouseMove = function(evt){
    var p = new Point(evt.clientX,evt.clientY);
};

Controller.prototype.onMouseUp = function(evt){
    var p = new Point(evt.clientX,evt.clientY);
};