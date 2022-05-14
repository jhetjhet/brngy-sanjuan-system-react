import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import Pagination from "../../Pagination";
import SearchbarInput from "../../SearchbarInput";
import Select from "../../Select";
import Table from "../../Table";
import RecordsFilter from "./RecordsFilter";


const DATAFRAME_COLUMNS = [
    {
        value: "Family Name"
    },
    {
        value: "First Name"
    },
    {
        value: "Middle Name"
    },
    {
        value: "Gender"
    },
    {
        value: "Place of Birth"
    },
    {
        value: "House Number"
    },
    {
        value: "Street, Purok, Sitio, Subd."
    },
    {
        value: "Religion"
    },
    {
        value: "Educational Attainment"
    },
    {
        value: "Phone Number"
    },
    {
        value: "Photo"
    },
    {
        value: "Spouse Name"
    },
    {
        value: "Location"
    },
    {
        value: "__id"
    },
];

export default function RecordDetail() {

    const [religions, setReligions] = useState([]);
    const [ordering, setOrdering] = useState(DATAFRAME_COLUMNS[0].value);
    const [search, setSearch] = useState(null);
    const [searchTarget, setSearchTarget] = useState(DATAFRAME_COLUMNS[0].value);
    const [gender, setGender] = useState(null);
    const [religion, setReligion] = useState(null);
    const [page, setPage] = useState(0);

    const params = useParams();
    const [cookies] = useCookies();

    useEffect(() => {
        console.log(params.recordID)
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/dataset/${params.recordID}/filters`, {
            headers: {
                Authorization: `Token ${cookies[process.env.REACT_APP_AUTH_TOKEN]}`,
            },
            params: {
                columns: 'Religion',
                __drop_duplicates__subset: 'Religion',
            }
        }).then((resp) => {
            setReligions(resp.data.results.data.map((rel) => rel[0]));
        });
    }, []);

    useEffect(() => {
        setPage(0);
    }, [gender, religion]);

    return (
        <div className="mt-4">
            <div className="w-full flex flex-col items-center justify-center mb-4">
                <div className="w-full max-w-sm">
                    <SearchbarInput onSubmit={setSearch} />
                </div>
                <div className="w-4/5 flex space-x-2 justify-center mt-2">
                    <div className="w-full max-w-lg">
                        <Select
                            label="Search Target"
                            value={searchTarget}
                            options={DATAFRAME_COLUMNS}
                            onSelect={setSearchTarget}
                        />
                    </div>
                    <div className="w-full max-w-lg">
                        <Select
                            label="Ordering"
                            value={ordering}
                            options={DATAFRAME_COLUMNS}
                            onSelect={setOrdering}
                        />
                    </div>
                    <div className="w-full max-w-lg">
                        <Select
                            label="Gender"
                            value={gender}
                            options={[{ label: '-----', value: null }, { value: 'Male' }, { value: 'Female' }]}
                            onSelect={setGender}
                        />
                    </div>
                    <div className="w-full max-w-lg">
                        <Select
                            label="Religion"
                            value={religion}
                            options={[{ label: '-----', value: null }, ...Object.values(religions).map((rel) => ({ value: rel }))]}
                            onSelect={setReligion}
                        />
                    </div>
                </div>
            </div>
            <div>
                <RecordsFilter
                    recordID={params.recordID}
                    page={page + 1}
                    ordering={ordering}
                    gender={gender}
                    religion={religion}
                    search={{
                        target: searchTarget,
                        value: search,
                    }}
                >
                    {(index, columns, rows, data) => (
                        <Fragment>
                            <Table
                                columns={[...columns, 'Edit']}
                                rows={rows.map((d, i) => [...d, {value: 'edit', link: `/records/${params.recordID}/${index[i]}`}])}
                            />
                            {(data && data.page_count > 1) && (
                                <div className="w-full flex mt-3">
                                    <div className="m-auto">
                                        <Pagination
                                            currPage={1}
                                            pageCount={data.page_count}
                                            onChange={(e) => setPage(e.selected)}
                                        />
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    )}
                </RecordsFilter>
            </div>
        </div>
    );
}