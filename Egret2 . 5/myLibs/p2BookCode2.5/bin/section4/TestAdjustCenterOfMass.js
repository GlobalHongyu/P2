var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TestAdjustCenterOfMass = (function (_super) {
    __extends(TestAdjustCenterOfMass, _super);
    function TestAdjustCenterOfMass() {
        _super.call(this);
    }
    TestAdjustCenterOfMass.prototype.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBody();
        _super.prototype.enableMouseDrag.call(this, this.world);
    };
    TestAdjustCenterOfMass.prototype.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 10];
        this.world = wrd;
    };
    TestAdjustCenterOfMass.prototype.createGround = function () {
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.addShape(groundShape);
        groundBody.type = p2.Body.STATIC;
        groundBody.position = [0, 350 / this.factor];
        groundBody.angle = Math.PI;
        this.world.addBody(groundBody);
    };
    TestAdjustCenterOfMass.prototype.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    TestAdjustCenterOfMass.prototype.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
        this.debugDraw.drawCircle(this.bodyRef.position, 3 / this.factor, 0xff0000);
    };
    //add new function bleow here===========================
    TestAdjustCenterOfMass.prototype.createBody = function () {
        var size = 40 / this.factor;
        var circle = new p2.Circle({ radius: size });
        var body = new p2.Body({ mass: 1, position: [274 / this.factor, 200 / this.factor] });
        body.addShape(circle, [0, -size]);
        var rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 2]);
        rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 3]);
        rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 4]);
        rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 5]);
        this.world.addBody(body);
        this.bodyRef = body;
        body.allowSleep = false;
        body.updateMassProperties();
    };
    return TestAdjustCenterOfMass;
})(AbstractP2Test);
//# sourceMappingURL=TestAdjustCenterOfMass.js.map