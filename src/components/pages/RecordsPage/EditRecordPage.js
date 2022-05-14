import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../Input";
import PhotoInput from "../../PhotoInput";


export default function EditRecordPage() {
    const DEFAULT_FIELDS = {
        "Family Name": "",
        "First Name": "",
        "Middle Name": "",
        "Gender": "",
        "Place of Birth": "",
        "House Number": "",
        "Street, Purok, Sitio, Subd.": "",
        "Religion": "",
        "Educational Attainment": "",
        "Phone Number": "",
        // "Photo": "",
        "Spouse Name": "",
        "Location": "",
        "__id": "",
    }

    const [fields, setFields] = useState({ ...DEFAULT_FIELDS });
    const [photoUrl, setPhotoUrl] = useState();

    const params = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/dataset/${params.recordID}/index/${params.index}`).then((resp) => {
            const data = resp.data;
            const newFields = {};
            Object.keys(fields).forEach((fk) => {
                newFields[fk] = data[fk] || "";
            });
            setFields(newFields);
            setPhotoUrl(data.Photo)
        });
    }, []);

    const onFieldsChange = (e) => {
        const { name, value } = e.target;
        const newFields = { ...fields, [name]: value };
        setFields(newFields);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/dataset/${params.recordID}/index/${params.index}/`, fields).then((resp) => {
            console.log(resp.data);
        });
    }

    return (
        <div className="mt-8">
            <form onSubmit={onSubmit}>
                <div className="mx-2 ">
                    <div className="max-w-xl bg-gray-100">
                        <div className="w-full mb-3">
                            <PhotoInput 
                                initSrc={photoUrl}
                            />
                        </div>
                        <div>
                            {Object.keys(fields).map((fk, i) => (
                                <Input
                                    key={i}
                                    placeholder={fk}
                                    label={fk}
                                    name={fk}
                                    value={fields[fk]}
                                    onChange={onFieldsChange}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-12 w-full bg-broom-300 flex items-center">
                    <div className="ml-auto pr-3">
                        <button className="py-1 px-2 rounded-lg text-white bg-parsley-600 hover:bg-parsley-500">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}