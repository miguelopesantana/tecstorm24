"use client"
// export default function Dropzone() {

//     return (
//         <div className="flex items-center justify-center w-full">
//             <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
//                     </svg>
//                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//                 </div>
//                 <input id="dropzone-file" type="file" className="hidden" />
//             </label>
//         </div>
//     )
// }

import { useState, useCallback } from 'react';
import FilePreview from './file-preview';
import { UploadIcon } from '@radix-ui/react-icons';
import { toast } from "sonner"

export default function FileUpload({ files, setFiles }: { files: File[], setFiles: any }) {
    const [fileDragging, setFileDragging] = useState<number | null>(null);
    const [fileDropping, setFileDropping] = useState<number | null>(null);


    const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const type = "audio/"

        for (const file of files) {
            console.log(file.type)
            if (!file.type.includes(type)) {
                toast.error("Error uploading files", {
                    description: "All files must be either audio or text files."
                })
                return;
            }
        }

        console.log(files)
        setFiles((prevFiles: File[]) => [...prevFiles, ...files]);
    };

    const removeFile = (index: number) => {
        setFiles((prev: File[]) => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        setFileDropping(null);
        if (fileDragging === null) return;
        const newFiles = [...files];
        const [removed] = newFiles.splice(fileDragging, 1);
        newFiles.splice(index, 0, removed);
        setFiles(newFiles);
        setFileDragging(null);
    };

    const handleDragStart = (index: number) => {
        setFileDragging(index);
    };

    const handleDragEnter = (index: number) => {
        setFileDropping(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragLeave = () => {
        setFileDropping(null);
    };

    return (
        <div className=" w-full bg-white rounded mx-auto">
            <div className="relative flex flex-col p-6 text-gray-600">
                <div
                    className="relative flex flex-col text-black border border-slate-400 border-dashed rounded cursor-pointer"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <input
                        accept="*"
                        type="file"
                        multiple
                        className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                        onChange={addFiles}
                        title=""
                    />
                    <div className="flex flex-col items-center justify-center gap-2
                     bg-slate-200 py-10 text-center">
                        <UploadIcon className="w-6 h-6 text-black" />
                        <p>Drag your files here or click in this area.</p>
                    </div>
                </div>
                {files.length > 0 && (
                    <ul className="grid gap-4 mt-4 grid-cols-5">
                        {files.map((file, index) => (
                            <FilePreview file={file} index={index} key={index} removeFile={removeFile} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
