var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TestContactEquation = (function (_super) {
    __extends(TestContactEquation, _super);
    function TestContactEquation() {
        _super.call(this);
        this.worldNormal = new Array();
    }
    TestContactEquation.prototype.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();
        this.addEvent();
        _super.prototype.enableMouseDrag.call(this, this.world);
    };
    TestContactEquation.prototype.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 0];
        this.world = wrd;
    };
    TestContactEquation.prototype.createGround = function () {
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.addShape(groundShape);
        groundBody.type = p2.Body.STATIC;
        groundBody.position = [0, 300 / this.factor];
        groundBody.angle = Math.PI;
        this.world.addBody(groundBody);
    };
    TestContactEquation.prototype.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    TestContactEquation.prototype.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
        if (this.worldContactPoint != null) {
            this.debugDraw.drawCircle(this.worldContactPoint, 3 / this.factor, 0xff0000, 1, true);
            this.debugDraw.drawVecAt(this.worldNormal, this.worldContactPoint, 0x0000ff);
        }
    };
    TestContactEquation.prototype.addEvent = function () {
        var _this = this;
        this.world.on("beginContact", function (event) {
            for (var i = 0; i < event.contactEquations.length; i++) {
                var contactEquation = event.contactEquations[i];
                _this.worldContactPoint = [];
                p2.vec2.add(_this.worldContactPoint, contactEquation.bodyA.position, contactEquation.contactPointA);
                p2.vec2.copy(_this.worldNormal, contactEquation.normalA);
            }
        });
        this.world.on("endContact", function () {
            _this.worldContactPoint = null;
        });
    };
    TestContactEquation.prototype.createBodies = function () {
        var b = this.createRectangle(100, 50);
        var b2 = this.createCircle(200, 200);
    };
    TestContactEquation.prototype.createRectangle = function (x, y) {
        x = x / this.factor;
        y = y / this.factor;
        var shape = new p2.Box({ width: 100 / this.factor, height: 50 / this.factor });
        var body = new p2.Body({ mass: 1, position: [x, y], angle: Math.PI / 4 });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    TestContactEquation.prototype.createCircle = function (x, y) {
        x = x / this.factor;
        y = y / this.factor;
        var circleShape = new p2.Circle({ radius: 50 / this.factor });
        var body = new p2.Body({ mass: 1, position: [x, y], angularVelocity: 2 });
        body.addShape(circleShape);
        this.world.addBody(body);
        return body;
    };
    return TestContactEquation;
})(AbstractP2Test);
//# sourceMappingURL=TestContactEquation.js.map