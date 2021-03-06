var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DemoDistanceConstraint = (function (_super) {
    __extends(DemoDistanceConstraint, _super);
    function DemoDistanceConstraint() {
        _super.call(this);
    }
    DemoDistanceConstraint.prototype.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createJoint();
        _super.prototype.enableMouseDrag.call(this, this.world);
    };
    DemoDistanceConstraint.prototype.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 0];
        this.world = wrd;
        ;
    };
    DemoDistanceConstraint.prototype.createGround = function () {
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.addShape(groundShape);
        groundBody.type = p2.Body.STATIC;
        groundBody.position = [0, 380 / this.factor];
        groundBody.angle = Math.PI;
        this.world.addBody(groundBody);
    };
    DemoDistanceConstraint.prototype.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    DemoDistanceConstraint.prototype.createJoint = function () {
        var bodyA = this.createRectangle(275, 200, 100, 20);
        bodyA.fixedRotation = true;
        bodyA.fixedX = true;
        bodyA.updateMassProperties();
        var bodyB = this.createCircle(275, 300, 30);
        bodyB.type = p2.Body.KINEMATIC;
        bodyB.updateMassProperties();
        bodyB.angularVelocity = 60 * Math.PI / 180;
        var joint = new p2.DistanceConstraint(bodyA, bodyB, {
            localAnchorA: [0, 0],
            localAnchorB: [30 / this.factor, 0]
        });
        joint.collideConnected = false;
        this.world.addConstraint(joint);
    };
    DemoDistanceConstraint.prototype.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
    };
    DemoDistanceConstraint.prototype.createRectangle = function (x, y, w, h) {
        var shape = new p2.Box({ width: w / this.factor, height: h / this.factor });
        var body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    DemoDistanceConstraint.prototype.createCircle = function (x, y, r) {
        var circleShape = new p2.Circle({ radius: r / this.factor });
        var body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor], angularVelocity: 2 });
        body.addShape(circleShape);
        this.world.addBody(body);
        return body;
    };
    return DemoDistanceConstraint;
})(AbstractP2Test);
//# sourceMappingURL=DemoDistanceConstraint.js.map