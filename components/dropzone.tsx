"use client"
import { useState, useCallback } from 'react';
import { UploadIcon } from '@radix-ui/react-icons';
import { toast } from "sonner"
import FilePreview from './file-preview';
import { FileWithTrascript } from '@/lib/utils';

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
        setFiles((prevFiles: FileWithTrascript[]) => [...prevFiles, ...files]);
    };

    const removeFile = (index: number) => {
        setFiles((prev: FileWithTrascript[]) => {
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
        <div className=" w-full bg-white rounded mx-auto relative flex flex-col p-6 text-gray-600">
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
    );
};
