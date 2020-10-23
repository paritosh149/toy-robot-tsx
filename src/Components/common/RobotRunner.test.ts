import { RobotRunner } from './RobotRunner';

describe('RobotRunner', function () {
  it('create Playboard', function () {
    const runner = new RobotRunner(10, 10);
    expect(runner.playboard).toBeDefined();
  });

  it('invalid parameters', function () {
    expect(() => new RobotRunner(0, -1)).toThrow('Negetive size attempted');
  });

  it('creates Robot', () => {
    const runner = new RobotRunner(10, 10);
    expect(runner.robot).toBeDefined();
  });

  it('runs multiple input commands', () => {
    const runner = new RobotRunner(10, 10);
    const result = runner.run('PLACE 3,5,WEST\nREPORT');
    expect(result).toEqual('3,5,WEST');
  });

  it('processes single input command', () => {
    const runner = new RobotRunner(10, 10);
    const result = runner.processInputLine('PLACE 3,5,WEST');
    expect(result).toEqual({
      isToBeDisplayed: false,
      position: { f: 'WEST', point: { x: 3, y: 5 } },
    });
  });

  it('invalid single input command', () => {
    const runner = new RobotRunner(10, 10);
    const result = runner.processInputLine('MOVE');
    expect(result).toEqual({ isToBeDisplayed: false, position: undefined });
  });
});
