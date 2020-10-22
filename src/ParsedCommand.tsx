import { CommandEnum } from './CommandEnum';
import { DirectionEnum } from './DirectionEnum';
import { Vector } from './Vector';

export class ParsedCommand {
  command: CommandEnum;
  position: Vector;
  parse = (inputLine: string): ParsedCommand => {
    const inputParts = inputLine.trim().toUpperCase().split(' ');
    if (inputParts.length === 0) {
      throw new Error('Invalid input');
    }
    const command = CommandEnum[inputParts[0] as CommandEnum];
    if (command === undefined) {
      throw new Error('Invalid command: ' + inputParts[0]);
    }
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
        this.position = new Vector(
          Number(positionParts[0]),
          Number(positionParts[1]),
          DirectionEnum[positionParts[2] as DirectionEnum]
        );
      } else throw new Error('Missing parameters for Command: ' + inputLine);
    }
    this.command = command;

    console.log('Parsed Command: ' + this.command, this.position);

    return this;
  };
}
