import * as React from 'react';
import { IDropZoneProps } from './IDropZoneProps';

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
      const filereader = new FileReader();
      filereader.onload = function () {
        props.onFileReadComplete(filereader.result as string);
      };
      filereader.readAsText(files[0]);
    }
  };
  // onFileReadComplete
  return (
    <table style={{ width: '100%' }}>
      <tbody>
        <tr style={{ height: '100px' }}>
          <td colSpan={2} style={{ border: '1px solid black' }}>
            <div
              onDrop={(e) => handleDrop(e)}
              onDragOver={(e) => handleDragOver(e)}
              onDragEnter={(e) => handleDragEnter(e)}
              onDragLeave={(e) => handleDragLeave(e)}>
              Drop your command files here
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
