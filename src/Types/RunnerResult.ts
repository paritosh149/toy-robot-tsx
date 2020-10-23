import { Vector } from './Vector';

export class RunnerResult {
  position: Vector | undefined;
  isToBeDisplayed: boolean;

  constructor() {
    this.position = undefined;
    this.isToBeDisplayed = false;
  }
}
