import React, { MouseEvent, useState } from 'react';
import { RobotRunner } from '../Components/common/RobotRunner';
import DropZone from '../Components/DropZone';
import fileData from '../../RobotFile.txt';

import './styles.css';

export default function App() {
  const [inputData, setInputData] = useState<string>('');
  const [outputData, setOutputData] = useState<string>('');
  const [sizeData, setSizeData] = useState({ x: 5, y: 5 });
  const run = (event: MouseEvent) => {
    const runner = new RobotRunner(sizeData.x, sizeData.y);
    setOutputData(runner.run(inputData));
  };
  const reset = (event: MouseEvent) => {
    setInputData('');
    setOutputData('');
  };

  const addCommandLine = (command: string) => {
    const newState = inputData + (inputData.length > 0 ? '\n' : '') + command;
    setInputData(newState);
  };

  const fillCommands = (content: string) => {
    setInputData(content);
  };

  const loadTestData = (e: React.MouseEvent) => {
    fillCommands(fileData);
  };
  return (
    <div className="App">
      <h1>Hello Robot players</h1>
      <h2>Place your robot and click Run to start</h2>
      <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <thead>
          <tr>
            <td>Input</td>
            <td>Output</td>
            <td>Board Size</td>
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
            <td>
              <div>
                X:
                <input
                  onChange={(e) => {
                    setSizeData((state) => ({
                      ...state,
                      x: Number(e.target.value),
                    }));
                  }}
                  value={sizeData.x}
                  style={{ width: '20px' }}
                />
              </div>
              <div>
                Y:
                <input
                  onChange={(e) => {
                    setSizeData((state) => ({
                      ...state,
                      y: Number(e.target.value),
                    }));
                  }}
                  value={sizeData.y}
                  style={{ width: '20px' }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={() => addCommandLine('PLACE 0,0,NORTH')}>
                PLACE
              </button>
              <button onClick={() => addCommandLine('MOVE')}>MOVE</button>
              <button onClick={() => addCommandLine('LEFT')}>LEFT</button>
              <button onClick={() => addCommandLine('RIGHT')}>RIGHT</button>
              <button onClick={() => addCommandLine('REPORT')}>REPORT</button>
              <button onClick={run}>Run</button>
              <button onClick={reset}>Reset</button>
              <button onClick={loadTestData}>Load</button>
            </td>
          </tr>
        </tbody>
      </table>
      <DropZone onFileReadComplete={fillCommands} />
    </div>
  );
}
