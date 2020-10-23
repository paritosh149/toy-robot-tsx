import { Vector } from './Vector';

export class Playboard {
  sizeX: number;
  sizeY: number;
  public isValidPosition(position: Vector | undefined): boolean {
    if (position === undefined) return false;
    return (
      position.point.x >= 0 &&
      position.point.x < this.sizeX &&
      position.point.y >= 0 &&
      position.point.y < this.sizeY
    );
  }

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }
}
