import { ParsedCommand } from './ParsedCommand';
import { CommandProcessor } from './CommandProcessor';
import { Playboard } from './Playboard';
import { Robot } from './Robot';
import { RunnerResult } from './RunnerResult';
import { CommandEnum } from './CommandEnum';

export class RobotRunner {
  playboard: Playboard;
  robot: Robot;
  parsedCommand: ParsedCommand;
  constructor(sizeX: number, sizeY: number) {
    this.playboard = new Playboard(sizeX, sizeY);
    this.robot = new Robot();
    this.parsedCommand = new ParsedCommand();
  }
  run = (inputMultiLine: string) => {
    console.log('Running for ' + inputMultiLine);
    const history = inputMultiLine.split('\n').map((inputLine) => {
      console.log('Current Line: ' + inputLine);
      const result = this.processInputLine(inputLine);
      return result;
    });
    return history
      .filter((element) => element.isToBeDisplayed)
      .map((element) => element?.position?.toString())
      .join('\n');
  };

  processInputLine(inputLine: string): RunnerResult {
    let result = new RunnerResult();
    // parse the command
    try {
      this.parsedCommand.parse(inputLine);
      result.isToBeDisplayed =
        this.parsedCommand.command === CommandEnum.REPORT;
    } catch (e) {
      console.log('Parsing ' + e);
    }
    try {
      this.robot.position = CommandProcessor.processCommand(
        this.robot.position,
        this.parsedCommand,
        this.playboard
      );
      console.log('New robot position is ', this.robot.position);
    } catch (e) {
      console.log('Processing ' + e);
    }
    result.position = this.robot.position;
    return result;
  }
}
