//more fucking boilerplates
//translated from JAVA
const E = 0.01;
const PREC = 0.001;

function ease(cur, target, _E) {
  var E = _E || E;
  if (abs(cur - target) < PREC) {
    return target;
  }
  return cur + (target - cur) * E;
}

var pstage = {
  init: 0b0001,
  v: 0b0010,
  a: 0b0100,
  p: 0b1000
};

export class psys {
  constructor() {
    this.ps = [];
    this.autoClean = false;
  }
  add(p) {
    this.ps.push(p);
  }
  remove(p) {
    p.remove = true;
  }
  onupdate() {}
  onautodelete(id, p) {}
  update() {
    this.onupdate();
    for (var i = 0; i < this.ps.length; i++) {
      this.ps[i].update();
      if ((this.autoClean && this.ps[i].dead) || this.ps[i].remove) {
        this.onautodelete(i, this.ps[i]);
        this.ps.splice(i, 1); //bad code (trump), terrible
        i--;
      }
    }
  }
}

function aabb(x, y, w, h, bx, by, bw, bh) {
  return x < bx + bw && x + w > bx && y < by + bh && h + y > by;
}

function mult(vec, scale) {
  for (var i = 0; i < vec.length; i++) {
    vec[i] *= scale;
  }
  return vec;
}

function add(v, adder) {
  for (var i = 0; i < v.length; i++) {
    v[i] += adder[i];
  }
  return v;
}

function sub(v, subber) {
  for (var i = 0; i < v.length; i++) {
    v[i] -= adder[i];
  }
  return v;
}

window.mult = mult;
window.sub = sub;
window.add = add;

export class p {
  constructor() {
    this.p = [0, 0];
    this.a = [0, 0];
    this.v = [0, 0];
    this.l = 0;
    this.vl = 0;
    this.dead = false;
    this.b = [];
  }

  onupdate() {}
  update() {
    if (this.dead) {
      return;
    }
    var t = 0.5; //10.0 / (float)frameRate;
    mult(this.a, 0);

    this.b.forEach(b => {
      if (!b.enabled || (b.stage & pstage.init) == 0) return;
      b.update(pstage.init);
    });

    this.onupdate();

    this.b.forEach(b => {
      if (!b.enabled || (b.stage & pstage.a) == 0) return;
      b.update(pstage.a);
    });

    mult(this.a, t);
    add(this.v, this.a);

    this.b.forEach(b => {
      if (!b.enabled || (b.stage & pstage.v) == 0) return;
      b.update(pstage.v);
    });

    add(this.p, [this.v[0] * t, this.v[1] * t]);

    this.b.forEach(b => {
      if (!b.enabled || (b.stage & pstage.p) == 0) return;
      b.update(pstage.p);
    });

    if (this.vl > 0) {
      this.l -= this.vl * t;
      if (this.l < 0) {
        this.dead = true;
      }
    }
    this.render();
  }

  render() {
    // pushMatrix();
    // fill(255, 0, 0);
    // translate(p.x, p.y, p.z);
    // rect(0, 0, 30, 30);
    // popMatrix();
  }
}

export class behavior {
  constructor(p) {
    this.p = p;
    p.b.push(this);
    this.enabled = true;
    this.stage = 0;
  }
  update(stage) {}
}

export class pvalue extends behavior {
  constructor(p) {
    super(p);
    this.stage = pstage.init;

    this.PRECISION = 1;
    this.val = 0;
    this.target = 0;
    this.E = 0.1;
    this.complete = false;
  }
  update(stage) {
    var cur = ease(this.val, this.target, this.E);
    if (cur == val) {
      this.complete = true;
    } else {
      this.complete = false;
    }
    this.val = cur;
  }
  set(val, target) {
    this.val = val;
    this.target = target;
  }
}

export class ptarget extends behavior {
  constructor(p) {
    super(p);
    this.stage = pstage.init | pstage.v;
    this.PRECISION = 1;
    this.pos = null;
    this.rate = 0.1;
    this.damper = 0.8;
    this.complete = false;
  }
  update(stage) {
    if (this.pos == null) {
      this.complete = false;
      return;
    }
    if (stage == pstage.init) {
      var d = [this.pos[0] - this.p.p[0], this.pos[1] - this.p.p[1]];
      this.complete = Math.abs(d[0]) + Math.abs(d[1]) < this.PRECISION;
      if (!this.complete) {
        this.p.a = [
          (this.pos[0] - this.p.p[0]) * this.rate,
          (this.pos[1] - this.p.p[1]) * this.rate
        ];
      }
    } else if (stage == pstage.v) {
      if (!this.complete) {
        mult(this.p.v, this.damper);
      }
    }
  }
}

export class pboundary extends behavior {
  constructor(p, rect) {
    super(p);
    this.stage = pstage.init;
    this.rect = rect || [0, 0, 0, 0];
    this.w = 1;
    this.h = 1;
  }
  update(stage) {
    if (
      !aabb(
        this.p.p[0],
        this.p.p[1],
        this.w,
        this.h,
        this.rect[0],
        this.rect[1],
        this.rect[2],
        this.rect[3]
      )
    ) {
      this.p.dead = true;
    }
  }
}
