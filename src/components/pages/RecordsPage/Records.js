import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Select from "../../Select";
import Table from "../../Table";
import RecordsFilter from "./RecordsFilter";


export default function Records() {
    const [rows, setRows] = useState([]);

    const [cookies] = useCookies();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/dataset/`, {
            headers: {
                Authorization: `Token ${cookies[process.env.REACT_APP_AUTH_TOKEN]}`,
            },
        }).then((resp) => {
            const results = resp.data.results;
            let newRows = results.map((result) => [
                {
                    value: result.file_name,
                    link: `/records/${result.id}/`,
                },
                result.date_uploaded,
                {
                    value: result.file,
                    link: result.file,
                },
            ]);
            setRows(newRows);
        });
    }, []);

    return (
        <div className="mt-16 flex">
            <div className="mx-auto w-full">
                {/* <div>
                    <Select 
                        label=""
                        onSelect={() => {}}
                        options={[
                            {
                                value: 'opt 1'
                            },
                            {
                                value: 'opt 2'
                            },
                        ]}
                    />
                </div> */}
                <Table 
                    columns={['Name', 'Date', 'File']}
                    rows={rows}
                />
                {/* <RecordsFilter>
                    {(columns, rows) => (
                        <div className="w-full">
                            <Table
                                columns={columns}
                                rows={rows}
                            />
                        </div>
                    )}
                </RecordsFilter> */}

            </div>
        </div>
    );
}