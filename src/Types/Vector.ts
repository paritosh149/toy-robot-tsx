import { DirectionEnum } from './DirectionEnum';
import { Point } from './Point';
export class Vector {
  point: Point;
  f: DirectionEnum;

  constructor(x: number, y: number, f: DirectionEnum) {
    this.point = new Point(x, y);
    this.f = f;
  }
  toString() {
    return this.point.x + ',' + this.point.y + ',' + this.f;
  }
}
