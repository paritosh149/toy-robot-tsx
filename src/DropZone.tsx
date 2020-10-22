import * as React from 'react';
import { IDropZoneProps } from './IDropZoneProps';

export function FileToText(file: File, onFileReadComplete: Function): void {
  const filereader = new FileReader();
  filereader.onload = function () {
    onFileReadComplete(filereader.result as string);
  };
  filereader.readAsText(file);
}

export default function DropZone(props: IDropZoneProps) {
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length === 1) {
      FileToText(files[0], props.onFileReadComplete);
    }
  };
  // onFileReadComplete
  return (
    <table style={{ width: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
      <tbody
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}>
        <tr style={{ height: '100px' }}>
          <td colSpan={2} style={{ border: '1px solid black' }}>
            <div>Drop your command file here</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
