import { CommandEnum } from './CommandEnum';
import { Vector } from './Vector';

export class ParsedCommand {
  command: CommandEnum;
  position: Vector | undefined;

  constructor(command: CommandEnum) {
    this.command = command;
  }
}
