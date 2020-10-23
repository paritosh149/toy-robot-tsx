import { CommandEnum } from '../../Types/CommandEnum';
import { ParsedCommand } from '../../Types/ParsedCommand';
import { Vector } from '../../Types/Vector';
import { Playboard } from '../../Types/Playboard';
import { DirectionEnum } from '../../Types/DirectionEnum';

export class CommandProcessor {
  static processCommand(
    currentPosition: Vector | undefined,
    command: ParsedCommand,
    playboard: Playboard
  ): Vector | undefined {
    console.log('Processing: ', currentPosition, command, playboard);
    switch (command.command) {
      case CommandEnum.PLACE:
        if (playboard.isValidPosition(command.position)) {
          return command.position;
        }
        throw new Error('Invalid placement parameters');

      case CommandEnum.MOVE:
        if (currentPosition === undefined) {
          throw new Error('Invalid Command');
        }
        const newPosition = CommandProcessor.move(currentPosition);
        if (playboard.isValidPosition(newPosition)) {
          return newPosition;
        }
        throw new Error('Invalid Move');
      case CommandEnum.LEFT:
      case CommandEnum.RIGHT:
        if (currentPosition === undefined) {
          throw new Error('Invalid Command');
        }
        return new Vector(
          currentPosition.point.x,
          currentPosition.point.y,
          CommandProcessor.rotate(currentPosition, command.command)
        );
      case CommandEnum.REPORT:
        if (currentPosition === undefined) {
          throw new Error('Invalid Command');
        }
        return currentPosition;
      default:
        throw new Error('Unknown command');
    }
  }

  static move(currentPosition: Vector): Vector {
    switch (currentPosition.f) {
      case DirectionEnum.NORTH:
        return new Vector(
          currentPosition.point.x,
          currentPosition.point.y + 1,
          currentPosition.f
        );
      case DirectionEnum.SOUTH:
        return new Vector(
          currentPosition.point.x,
          currentPosition.point.y - 1,
          currentPosition.f
        );
      case DirectionEnum.EAST:
        return new Vector(
          currentPosition.point.x + 1,
          currentPosition.point.y,
          currentPosition.f
        );
      case DirectionEnum.WEST:
        return new Vector(
          currentPosition.point.x - 1,
          currentPosition.point.y,
          currentPosition.f
        );
    }
  }

  static rotate(currentPosition: Vector, command: CommandEnum): DirectionEnum {
    switch (command) {
      case CommandEnum.LEFT:
        return CommandProcessor.rotateLeft(currentPosition.f);
      case CommandEnum.RIGHT:
        return CommandProcessor.rotateRight(currentPosition.f);
      default:
        return currentPosition.f;
    }
  }

  static rotateLeft(currentDirection: DirectionEnum): DirectionEnum {
    switch (currentDirection) {
      case DirectionEnum.NORTH:
        return DirectionEnum.WEST;
      case DirectionEnum.WEST:
        return DirectionEnum.SOUTH;
      case DirectionEnum.SOUTH:
        return DirectionEnum.EAST;
      case DirectionEnum.EAST:
        return DirectionEnum.NORTH;
    }
  }

  static rotateRight(currentDirection: DirectionEnum): DirectionEnum {
    switch (currentDirection) {
      case DirectionEnum.NORTH:
        return DirectionEnum.EAST;
      case DirectionEnum.EAST:
        return DirectionEnum.SOUTH;
      case DirectionEnum.SOUTH:
        return DirectionEnum.WEST;
      case DirectionEnum.WEST:
        return DirectionEnum.NORTH;
    }
  }
}
