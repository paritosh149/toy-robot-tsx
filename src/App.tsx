import React, { MouseEvent, useState } from 'react';
import { RobotRunner } from './runner';
import './styles.css';

export default function App() {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const run = (event: MouseEvent) => {
    const runner = new RobotRunner();
    setOutputData(runner.run(inputData));
  };
  const reset = (event: MouseEvent) => {
    setInputData('');
    setOutputData('');
    console.log('Reset... Done.');
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
            <td>
              <button onClick={run}>Run</button>
            </td>
            <td>
              <button onClick={reset}>Reset</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
