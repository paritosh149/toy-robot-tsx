import { CommandParser } from './CommandParser';
// import { ParsedCommand } from '../../Types/ParsedCommand';
// import { Vector } from '../../Types/Vector';
// import { Point } from '../../Types/Point';

describe('CommandParser', () => {
  it('parses input command', () => {
    const result = CommandParser.parse('PLACE 7,9,East');
    expect(result).toEqual({
      command: 'PLACE',
      position: {
        f: 'EAST',
        point: { x: 7, y: 9 },
      },
    });
  });

  it('invalid input command 1', () => {
    const result = () => CommandParser.parse('FUNC');
    expect(result).toThrow('Invalid command: FUNC');
  });

  it('invalid input command 2', () => {
    const result = () => CommandParser.parse('');
    expect(result).toThrow('Invalid command: ');
  });

  it('Invalid PLACE command 1', () => {
    const result = () => CommandParser.parse('PLACE');
    expect(result).toThrow('Missing parameters for Command: PLACE');
  });

  it('Invalid PLACE command 2', () => {
    const result = () => CommandParser.parse('PLACE 1,2');
    expect(result).toThrow('Invalid command parameters: 1,2');
  });

  it('Invalid PLACE command 3', () => {
    const result = () => CommandParser.parse('PLACE 1,2,HSBC');
    expect(result).toThrow('Invalid direction parameter found: HSBC');
  });

  it('Invalid PLACE command 4', () => {
    const result = () => CommandParser.parse('PLACE A,2,NORTH');
    expect(result).toThrow('Invalid position x parameter found: A');
  });

  it('Invalid PLACE command 5', () => {
    const result = () => CommandParser.parse('PLACE 2,B,NORTH');
    expect(result).toThrow('Invalid position y parameter found: B');
  });
});
