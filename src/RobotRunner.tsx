import { ParsedCommand } from './ParsedCommand';
import { CommandParser } from './CommandParser';
import { CommandProcessor } from './CommandProcessor';
import { Playboard } from './Playboard';
import { Robot } from './Robot';
import { RunnerResult } from './RunnerResult';
import { CommandEnum } from './CommandEnum';

export class RobotRunner {
  playboard: Playboard;
  robot: Robot;
  parsedCommand: ParsedCommand | undefined;

  constructor(sizeX: number, sizeY: number) {
    this.playboard = new Playboard(sizeX, sizeY);
    this.robot = new Robot();
  }
  run = (inputMultiLine: string) => {
    console.log('Running for ' + inputMultiLine);
    const history = inputMultiLine.split('\n').map((inputLine) => {
      console.log('Current Line: ' + inputLine);
      const result = this.processInputLine(inputLine);
      return result;
    });
    return history
      .filter((element) => element?.isToBeDisplayed)
      .map((element) => element?.position?.toString())
      .join('\n');
  };

  processInputLine(inputLine: string): RunnerResult | undefined {
    let result = new RunnerResult();
    // parse the command
    try {
      this.parsedCommand = CommandParser.parse(inputLine);
    } catch (e) {
      console.log('Parsing ' + e);
      return;
    }
    try {
      this.robot.position = CommandProcessor.processCommand(
        this.robot.position,
        this.parsedCommand,
        this.playboard
      );
      result.isToBeDisplayed =
        this.parsedCommand.command === CommandEnum.REPORT;

      console.log('New robot position is ', this.robot.position);
    } catch (e) {
      console.log('Processing ' + e);
    }
    result.position = this.robot.position;
    return result;
  }
}
