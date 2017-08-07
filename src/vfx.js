import * as p from "./p.js";
import Color from "color";
import * as footer from "./footer.js";

var colors = ["#fce04c", "#409dec", "#dc352a"];

var w = window.innerWidth;
var h = window.innerHeight;

var devicePixelRatio = window.devicePixelRatio || 1;

//fucking boilerplates, sad
export class vfx {
  constructor(canvas) {
    this.canvas = canvas;
    var cvx = document.createElement("canvas");
    this.ctx = canvas.getContext("2d");
    this.canvas.height = window.innerHeight * devicePixelRatio;
    this.canvas.width = window.innerWidth * devicePixelRatio;
    this.p = new p.psys();
    this.p.autoClean = true;
  }

  update() {
    if (this.p.ps.length < 100 && Math.random() > 0.2) {
      var pt = new vfxParticle(
        this.ctx,
        colors[footer.config.selection]
      );
      //   pt.v = mult([0.5 - Math.random(), 0.5 - Math.random()], 100);
      pt.ptarget.pos[0] = pt.p[0];
      pt.ptarget.pos[1] = Math.random() * h;
      this.p.add(pt);
    }

    this.ctx.save();
    this.ctx.scale(devicePixelRatio, devicePixelRatio);
    this.ctx.clearRect(0, 0, w, h);
    this.p.update();
    this.ctx.restore();
  }
}

class vfxParticle extends p.p {
  ease(l, p) {
    return 1 - Math.pow((l - 0.5) * 2, p);
  }
  constructor(ctx, color) {
    super();
    this.ptarget = new p.ptarget(this);
    this.ptarget.pos = [w / 2, h / 2];
    this.ptarget.rate = 0.01;
    this.boundary = new p.pboundary(this, [0, 0, w, h]);
    this.ctx = ctx;
    this.scaler = Math.random() * 0.7;
    this.ptarget.damper = this.scaler;
    this.color = Color(color);
    this.category = Math.random() > 0.3 ? 1 : 0;
    this.l = 1;
    this.vl = 0.04;
    this.p = [Math.round(Math.random() * w / 50) * 50, Math.random() * h];
  }
  render() {
    // this.p[0] += 1;
    this.ctx.save();
    this.ctx.translate(this.p[0], this.p[1]);
    var e = this.ease(this.l, 8) * this.scaler;
    // this.ctx.scale(e, e);
    var s = e * 30;
    this.ctx.fillStyle = this.color
      .alpha(this.ease(this.l, 4) * this.scaler * 0.5)
      .string();

    this.ctx.strokeStyle = this.color
      .alpha(this.ease(this.l, 4))
      .string();
    this.ctx.beginPath();
    this.ctx.rect(-s / 2, -s / 2, s, s);
    this.category ? this.ctx.fill() : this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
}
