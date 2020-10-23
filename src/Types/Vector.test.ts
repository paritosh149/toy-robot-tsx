import { DirectionEnum } from './DirectionEnum';
import { Vector } from './Vector';
describe('Vector', () => {
  it('returns string notation 1', () => {
    const vector = new Vector(2, 3, DirectionEnum.NORTH);
    expect(vector.toString()).toEqual('2,3,NORTH');
  });

  it('returns string notation 2', () => {
    const vector = new Vector(1010, 4567, DirectionEnum.SOUTH);
    expect(vector.toString()).toEqual('1010,4567,SOUTH');
  });
});
