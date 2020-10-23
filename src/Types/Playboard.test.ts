import { DirectionEnum } from './DirectionEnum';
import { Playboard } from './Playboard';
import { Vector } from './Vector';

describe('Playboard', () => {
  let sizeX = 5;
  let sizeY = 6;

  let playboard;

  beforeAll(() => {
    playboard = new Playboard(sizeX, sizeY);
  });

  it('isValidPosition test 1', () => {
    const position = new Vector(2, 3, DirectionEnum.NORTH);
    expect(playboard.isValidPosition(position)).toBeTruthy();
  });

  it('isValidPosition test 2', () => {
    const position = new Vector(0, 0, DirectionEnum.NORTH);
    expect(playboard.isValidPosition(position)).toBeTruthy();
  });

  it('isValidPosition test 3', () => {
    const position = new Vector(sizeX, 3, DirectionEnum.NORTH);
    expect(playboard.isValidPosition(position)).toBeFalsy();
  });

  it('isValidPosition test 4', () => {
    const position = new Vector(0, sizeY, DirectionEnum.NORTH);
    expect(playboard.isValidPosition(position)).toBeFalsy();
  });

  it('isValidPosition test 5', () => {
    const position = new Vector(sizeX * 2, 3, DirectionEnum.NORTH);
    expect(playboard.isValidPosition(position)).toBeFalsy();
  });

  it('isValidPosition test 6', () => {
    const position = new Vector(0, sizeY * 2, DirectionEnum.NORTH);
    expect(playboard.isValidPosition(position)).toBeFalsy();
  });
});
