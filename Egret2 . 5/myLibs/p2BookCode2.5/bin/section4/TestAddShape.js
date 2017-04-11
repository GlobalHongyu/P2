var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TestAddShape = (function (_super) {
    __extends(TestAddShape, _super);
    function TestAddShape() {
        _super.call(this);
    }
    TestAddShape.prototype.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBody();
        _super.prototype.enableMouseDrag.call(this, this.world);
    };
    TestAddShape.prototype.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 0];
        this.world = wrd;
    };
    TestAddShape.prototype.createGround = function () {
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.addShape(groundShape);
        groundBody.type = p2.Body.STATIC;
        groundBody.position = [0, 350 / this.factor];
        groundBody.angle = Math.PI;
        this.world.addBody(groundBody);
    };
    TestAddShape.prototype.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    TestAddShape.prototype.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
        this.debugDraw.drawCircle(this.bodyRef.position, 3 / this.factor, 0xff0000);
    };
    //add new function bleow here===========================
    TestAddShape.prototype.createBody = function () {
        var rectSize = 40 / this.factor;
        var shape = new p2.Box({ width: rectSize, height: rectSize });
        var body = new p2.Body({ mass: 1, position: [274 / this.factor, 200 / this.factor] });
        body.addShape(shape, [0, 0]);
        shape = new p2.Box({ width: rectSize, height: rectSize });
        body.addShape(shape, [0, rectSize]);
        shape = new p2.Box({ width: rectSize, height: rectSize });
        body.addShape(shape, [0, rectSize * 2]);
        shape = new p2.Box({ width: rectSize, height: rectSize });
        body.addShape(shape, [rectSize, rectSize * 2]);
        this.world.addBody(body);
        this.bodyRef = body;
        body.allowSleep = false;
    };
    return TestAddShape;
})(AbstractP2Test);
//# sourceMappingURL=TestAddShape.js.map