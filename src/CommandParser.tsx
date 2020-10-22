import { CommandEnum } from './CommandEnum';
import { DirectionEnum } from './DirectionEnum';
import { Vector } from './Vector';
import { ParsedCommand } from './ParsedCommand';

export class CommandParser {
  static parse(inputLine: string): ParsedCommand {
    let result: ParsedCommand;
    const inputParts = inputLine.trim().toUpperCase().split(' ');
    if (inputParts.length === 0) {
      throw new Error('Invalid input');
    }
    const command = CommandEnum[inputParts[0] as CommandEnum];
    if (command === undefined) {
      throw new Error('Invalid command: ' + inputParts[0]);
    }
    result = new ParsedCommand(command);
    if (command === CommandEnum.PLACE) {
      if (inputParts.length === 2) {
        const positionParts = inputParts[1].split(',');
        if (
          positionParts.length !== 3 ||
          positionParts.some((part) => part.length === 0)
        ) {
          throw new Error('Invalid command parameters: ' + inputParts[1]);
        }
        // parse position
        result.position = new Vector(
          Number(positionParts[0]),
          Number(positionParts[1]),
          DirectionEnum[positionParts[2] as DirectionEnum]
        );
      } else throw new Error('Missing parameters for Command: ' + inputLine);
    }
    console.log('Parsed Command: ' + result.command, result.position);

    return result;
  }
}
