import ExcelFileUploader from "../../ExcelFileUploader";


export default function ImportRecordPage(){

    return (
        <div className="mt-16 flex">
            <div className="mx-auto w-full md:w-1/2">
                <ExcelFileUploader />
            </div>
        </div>
    );
}