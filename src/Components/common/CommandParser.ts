import { CommandEnum } from '../../Types/CommandEnum';
import { DirectionEnum } from '../../Types/DirectionEnum';
import { Vector } from '../../Types/Vector';
import { ParsedCommand } from '../../Types/ParsedCommand';

export class CommandParser {
  static parse(inputLine: string): ParsedCommand {
    let result: ParsedCommand;
    const inputParts = inputLine.trim().toUpperCase().split(' ');
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
        // parse direction
        const direction = DirectionEnum[positionParts[2] as DirectionEnum];
        if (direction === undefined)
          throw new Error(
            'Invalid direction parameter found: ' + positionParts[2]
          );
        const positionXNumber = Number(positionParts[0]);
        console.log(positionXNumber);
        if (isNaN(positionXNumber))
          throw new Error(
            'Invalid position x parameter found: ' + positionParts[0]
          );
        const positionYNumber = Number(positionParts[1]);
        if (isNaN(positionYNumber))
          throw new Error(
            'Invalid position y parameter found: ' + positionParts[1]
          );
        // parse position
        result.position = new Vector(
          positionXNumber,
          positionYNumber,
          direction
        );
      } else throw new Error('Missing parameters for Command: ' + inputLine);
    }
    console.log('Parsed Command: ' + result.command, result.position);

    return result;
  }
}
