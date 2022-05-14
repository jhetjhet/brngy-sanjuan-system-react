import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ConfirmationModal from "./ConfirmationModal";
import FileInput from "./FileInput";

function ExcelFileUploader() {
    const [excel, setExcel] = useState();
    const [showConfirm, setShowConfirm] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [erroMessage, setErrorMessage] = useState([]);
    const [loadedExcel, setLoadedExcel] = useState(null);

    const [cookies] = useCookies();

    useEffect(() => {
        axios.get('http://localhost:8000/api/dataset/loaded/', {
            headers: {
                Authorization: `Token ${cookies[process.env.REACT_APP_AUTH_TOKEN]}`,
            }
        }).then((resp) => {
            setLoadedExcel(resp.data);
        });
    }, []);

    const submit = (conf) => {
        if(!excel) return;

        setErrorMessage([]);
        if (conf) {
            setDisableSubmit(true);
            const data = new FormData();
            data.append('file', excel, excel.name);
            
            axios.post('http://localhost:8000/api/dataset/', data, {
                headers: {
                    Authorization: `Token ${cookies[process.env.REACT_APP_AUTH_TOKEN]}`,
                },
            }).then((resp) => {
                setLoadedExcel(resp.data);
            }).catch((err) => {
                if (err.response && err.response.data.file)
                    setErrorMessage(err.response.data.file)
            }).finally(() => {
                setDisableSubmit(false);
            })
        }

        setShowConfirm(false);
    }

    return (
        <div className="flex flex-col">
            {showConfirm && (
                <ConfirmationModal
                    label="Load new Excel File ?"
                    onChoice={submit}
                />
            )}
            <div className="mb-2">
                <span>Current File Uploaded: </span>
                {(loadedExcel) ? (
                    <p className="font-light ml-1 text-blue-500 hover:underline whitespace-nowrap text-ellipsis overflow-hidden">
                        <a href="#">{loadedExcel.file_name}</a>
                    </p>
                ) : (
                    <p className="inline-block">None.</p>
                )}
            </div>
            <FileInput onSelect={setExcel} />
            <button
                className={`p-2 bg-blue-500 mt-1 rounded hover:bg-blue-400 focus:ring focus:ring-blue-400 text-white ${excel ? (disableSubmit ? 'pointer-events-none animate-pulse' : '') : 'pointer-events-none bg-blue-400'}`}
                onClick={() => setShowConfirm(true)}
            >{disableSubmit ? 'saving...' : 'save'}</button>
            {(erroMessage.length > 0) && (
                <span className="text-center text-xs text-red-500">{erroMessage[0]}</span>
            )}
        </div>
    );
}

export default ExcelFileUploader;