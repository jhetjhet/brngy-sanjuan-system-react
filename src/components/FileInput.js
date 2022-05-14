import { useState } from "react";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileExcel,
} from "@fortawesome/free-solid-svg-icons";

function FileInput({ onSelect }){
    const [file, setFile] = useState('');

    const onFileSelect = (e) => {
        let newFile = e.target.files[0];
        setFile(newFile);
        onSelect(newFile);
    }

    const handleDragEnter = e => {
        e.preventDefault();
      };
    
      const handleDragLeave = e => {
        e.preventDefault();
      };
    
      const handleDragOver = e => {
        e.preventDefault();
      };
    
      const handleDrop = e => {
        e.preventDefault();
        if(e.dataTransfer.items[0].kind === 'file'){
            let newFile = e.dataTransfer.items[0].getAsFile();
            setFile(newFile);
            onSelect(newFile);
        }
      };

    return (
        <div className="w-full"
            onDrop={e => handleDrop(e)}
            onDragOver={e => handleDragOver(e)}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)}
        >
            <label
                className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faFileExcel} size="lg" />
                    <span className="font-medium text-gray-600">
                        Drop Excel File to Attach, or
                        <span className="text-blue-600 underline ml-1">browse</span>
                    </span>
                </span>
                <div className="text-xs text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden w-64 text-center">{file ? file.name : 'No file selected.'}</div>
                <input type="file" name="file_upload" className="hidden w-full" onChange={onFileSelect} accept=".xls, .xlsx" />
            </label>
        </div>
    );
}

FileInput.propTypes = {
    onSelect: PropTypes.func.isRequired,
}

export default FileInput;