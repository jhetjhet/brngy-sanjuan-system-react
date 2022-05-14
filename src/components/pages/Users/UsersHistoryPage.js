import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../Table";


export default function UsersHistoryPage(){
    const [logsRows, setLogsRows] = useState([]);

    const USER_LOGS_COLUMNS = [
        'User',
        'Action',
        'Date',
    ]

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/logs/`).then((resp) => {
            const results = resp.data.results;
            const newLogsRows = results.map((result) => ([
                result.user.username,
                result.action,
                result.date,
            ]));
            setLogsRows(newLogsRows);
        });
    }, []);

    return (
        <div className="mt-8">
            <h1 className="mb-3 ml-4 text-2xl font-bold">Authentication History</h1>
            <Table 
                columns={USER_LOGS_COLUMNS}
                rows={logsRows}
            />
        </div>
    );
}