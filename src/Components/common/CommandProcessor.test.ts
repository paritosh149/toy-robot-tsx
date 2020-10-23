import { CommandEnum } from '../../Types/CommandEnum';
import { ParsedCommand } from '../../Types/ParsedCommand';
import { Vector } from '../../Types/Vector';
import { DirectionEnum } from '../../Types/DirectionEnum';
import { CommandProcessor } from './CommandProcessor';
import { Playboard } from '../../Types/Playboard';

describe('CommnadProcessor', () => {
  let sizeX = 5;
  let sizeY = 6;

  let playboard;

  beforeAll(() => {
    playboard = new Playboard(sizeX, sizeY);
  });

  it('PLACEs the robot', () => {
    const parsedCommand = new ParsedCommand(CommandEnum.PLACE);
    parsedCommand.position = new Vector(2, 3, DirectionEnum.NORTH);
    const result = CommandProcessor.processCommand(
      undefined,
      parsedCommand,
      playboard
    );
    expect(result).toEqual(new Vector(2, 3, DirectionEnum.NORTH));
  });

  it('MOVEs the robot', () => {
    const parsedCommand = new ParsedCommand(CommandEnum.MOVE);
    const position = new Vector(2, 3, DirectionEnum.NORTH);
    const result = CommandProcessor.processCommand(
      position,
      parsedCommand,
      playboard
    );
    expect(result).toEqual(new Vector(2, 4, DirectionEnum.NORTH));
  });

  it('Rotates the robot LEFT', () => {
    const parsedCommand = new ParsedCommand(CommandEnum.LEFT);
    const position = new Vector(2, 3, DirectionEnum.NORTH);
    const result = CommandProcessor.processCommand(
      position,
      parsedCommand,
      playboard
    );
    expect(result).toEqual(new Vector(2, 3, DirectionEnum.WEST));
  });

  it('Rotates the robot RIGHT', () => {
    const parsedCommand = new ParsedCommand(CommandEnum.RIGHT);
    const position = new Vector(2, 3, DirectionEnum.NORTH);
    const result = CommandProcessor.processCommand(
      position,
      parsedCommand,
      playboard
    );
    expect(result).toEqual(new Vector(2, 3, DirectionEnum.EAST));
  });

  it('Invalid MOVE command 1', () => {
    const parsedCommand = new ParsedCommand(CommandEnum.MOVE);
    const position = new Vector(2, sizeY - 1, DirectionEnum.NORTH);
    const result = () =>
      CommandProcessor.processCommand(position, parsedCommand, playboard);
    expect(result).toThrowError('Invalid Move');
  });

  it('Invalid MOVE command 2', () => {
    const parsedCommand = new ParsedCommand(CommandEnum.MOVE);
    const position = new Vector(sizeX - 1, 3, DirectionEnum.EAST);
    const result = () =>
      CommandProcessor.processCommand(position, parsedCommand, playboard);
    expect(result).toThrowError('Invalid Move');
  });

  it('Invalid MOVE command 3', () => {
    const parsedCommand = new ParsedCommand(CommandEnum.MOVE);
    const position = new Vector(0, sizeY - 1, DirectionEnum.WEST);
    const result = () =>
      CommandProcessor.processCommand(position, parsedCommand, playboard);
    expect(result).toThrowError('Invalid Move');
  });

  it('Invalid MOVE command 4', () => {
    const parsedCommand = new ParsedCommand(CommandEnum.MOVE);
    const position = new Vector(2, 0, DirectionEnum.SOUTH);
    const result = () =>
      CommandProcessor.processCommand(position, parsedCommand, playboard);
    expect(result).toThrowError('Invalid Move');
  });
});
