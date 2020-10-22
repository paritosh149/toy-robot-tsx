import React, { MouseEvent, useState } from 'react';
import { RobotRunner } from './RobotRunner';
import DropZone from './DropZone';
import './styles.css';

export default function App() {
  const [inputData, setInputData] = useState<string>('');
  const [outputData, setOutputData] = useState<string>('');
  const run = (event: MouseEvent) => {
    const runner = new RobotRunner(5, 5);
    setOutputData(runner.run(inputData));
  };
  const reset = (event: MouseEvent) => {
    setInputData('');
    setOutputData('');
    console.log('Reset... Done.');
  };

  const addCommandLine = (command: string) => {
    const newState = inputData + (inputData.length > 0 ? '\n' : '') + command;
    setInputData(newState);
  };

  const fillCommands = (content: string) => {
    setInputData(content);
  };
  return (
    <div className="App">
      <h1>Hello Robot players</h1>
      <h2>Place your robot and click Run to start</h2>
      <table>
        <thead>
          <tr>
            <td>Input</td>
            <td>Output</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea
                rows={10}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInputData(e.target.value)
                }
                value={inputData}
              />
            </td>
            <td>
              <textarea rows={10} readOnly value={outputData} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={() => addCommandLine('PLACE')}>PLACE</button>
              <button onClick={() => addCommandLine('MOVE')}>MOVE</button>
              <button onClick={() => addCommandLine('LEFT')}>LEFT</button>
              <button onClick={() => addCommandLine('RIGHT')}>RIGHT</button>
              <button onClick={() => addCommandLine('REPORT')}>REPORT</button>
              <button onClick={run}>Run</button>
              <button onClick={reset}>Reset</button>
            </td>
          </tr>
        </tbody>
      </table>
      <DropZone onFileReadComplete={fillCommands} />
    </div>
  );
}
