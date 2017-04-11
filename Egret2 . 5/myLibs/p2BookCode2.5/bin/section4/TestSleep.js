var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TestSleep = (function (_super) {
    __extends(TestSleep, _super);
    function TestSleep() {
        _super.call(this);
    }
    TestSleep.prototype.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBody();
        _super.prototype.enableMouseDrag.call(this, this.world);
        var _this = this;
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 32)
                _this.switchToCall();
        });
    };
    TestSleep.prototype.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.NO_SLEEPING;
        wrd.gravity = [0, 10];
        this.world = wrd;
    };
    TestSleep.prototype.createGround = function () {
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
    TestSleep.prototype.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    TestSleep.prototype.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
    };
    TestSleep.prototype.createBody = function () {
        //创建Box形状刚体
        var boxShape = new p2.Box({ width: 80 / this.factor, height: 40 / this.factor });
        this.body = new p2.Body({ mass: 1, position: [160 / this.factor, 100 / this.factor], angularVelocity: 1 });
        this.body.addShape(boxShape);
        this.world.addBody(this.body);
    };
    TestSleep.prototype.switchToCall = function () {
        if (this.body.sleepState == p2.Body.AWAKE) {
            this.body.sleep();
        }
        else {
            this.body.wakeUp();
        }
    };
    return TestSleep;
})(AbstractP2Test);
//# sourceMappingURL=TestSleep.js.map