var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TesOverlaps = (function (_super) {
    __extends(TesOverlaps, _super);
    function TesOverlaps() {
        _super.call(this);
        this.offset = new Array();
    }
    TesOverlaps.prototype.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    TesOverlaps.prototype.createWorld = function () {
        var wrd = new p2.World();
        wrd.gravity = [0, 0];
        this.world = wrd;
    };
    TesOverlaps.prototype.createGround = function () {
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.addShape(groundShape, [0, 20 / this.factor]);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [0, 380 / this.factor], Math.PI);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [530 / this.factor, 0], Math.PI / 2);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [20 / this.factor, 380 / this.factor], -Math.PI / 2);
        groundBody.type = p2.Body.STATIC;
        this.world.addBody(groundBody);
    };
    TesOverlaps.prototype.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    TesOverlaps.prototype.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
        if (this.dragableBody != null) {
            this.debugDraw.drawShape(this.dragableBody.shapes[0], this.dragableBody, 0x0000ff, false);
            this.debugDraw.drawShape(this.sensorBody.shapes[0], this.sensorBody, 0xff0000, false);
        }
    };
    //add new function bleow here===========================
    TesOverlaps.prototype.createRectangle = function (x, y, w, h) {
        x = x / this.factor;
        y = y / this.factor;
        w = w / this.factor;
        h = h / this.factor;
        var shape = new p2.Box({ width: w, height: h });
        var body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    TesOverlaps.prototype.createCircle = function (x, y, r) {
        x = x / this.factor;
        y = y / this.factor;
        r = r / this.factor;
        var shape = new p2.Circle({ radius: r });
        var body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    TesOverlaps.prototype.createBodies = function () {
        this.createRectangle(100, 200, 100, 20);
        this.createRectangle(200, 200, 100, 20);
        this.createRectangle(400, 100, 150, 20).angle = -Math.PI / 6;
        this.createCircle(400, 300, 50);
        this.dragableBody = this.createRectangle(100, 100, 50, 50);
        this.dragableBody.shapes[0].sensor = true;
        this.sensorBody = this.createRectangle(100, 100, 50, 50);
        this.world.removeBody(this.sensorBody);
    };
    TesOverlaps.prototype.onTouch = function (te) {
        var mousePoint = new Array(te.stageX / this.factor, te.stageY / this.factor);
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if (this.world.hitTest(mousePoint, [this.dragableBody])) {
                    p2.vec2.subtract(this.offset, this.dragableBody.position, mousePoint);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                p2.vec2.add(this.dragableBody.position, mousePoint, this.offset);
                var _this = this;
                var okToDrag = true;
                this.world.bodies.forEach(function (body) {
                    if (_this.dragableBody.overlaps(body)) {
                        okToDrag = false;
                    }
                });
                if (okToDrag) {
                    p2.vec2.copy(_this.sensorBody.position, _this.dragableBody.position);
                }
                break;
        }
    };
    return TesOverlaps;
})(AbstractP2Test);
//# sourceMappingURL=TesOverlaps.js.map