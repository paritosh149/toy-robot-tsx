import { Point } from './point';

interface Playboard {
  sizeX: number;
  sizeY: number;
  isValidPoistion: (point: Point) => boolean;
}
