"use client"
import { useEffect, useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FileTextIcon, SpeakerLoudIcon } from '@radix-ui/react-icons';

export default function FilePreview({ index, file, removeFile }: { index: number, file: any, removeFile: any }) {
    const [text, setText] = useState(null);

    useEffect(() => {
        const transcribe = async () => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('http://localhost:3001/transcribe', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setText(data.text);
        }

        
    }, []);

    const humanFileSize = (size: number): string => {
        if (!size) return "0 B";  // Handle zero or undefined cases
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return ((size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][i]);
    };

    return (
        <li
            key={index}
            className=" h-28 w-28
            relative flex flex-col items-center overflow-hidden text-center bg-white border rounded select-none"
        // draggable
        // onDragStart={() => handleDragStart(index)}
        // onDrop={(e) => handleDrop(e, index)}
        // onDragEnter={() => handleDragEnter(index)}
        // style={{ paddingTop: '100%' }}
        >
            <button onClick={() => removeFile(index)} className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none">
                <Cross2Icon />
            </button>

            <div className='h-full w-full gap-2
            flex flex-col justify-center items-center'>
                {file.type.includes('application') && <FileTextIcon className='text-black w-8 h-auto object-center' />}
                {file.type.includes('audio') && <SpeakerLoudIcon className='text-black w-8 h-auto object-center' />}
                <span className="w-full text-[9px] font-bold truncate flex-wrap">{file.name}</span>
            </div>

 
            {/* <img className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white" src={file.preview} alt="Preview" /> */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                {/* <span className="text-xs text-gray-900">{humanFileSize(file.size)}</span> */}
            </div>
        </li>
    )
}