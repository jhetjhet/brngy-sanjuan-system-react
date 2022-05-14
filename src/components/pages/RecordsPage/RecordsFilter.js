import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { dataFrameJSONToRowsColums } from "../../Utils/utils";
import PropTypes from "prop-types";

function RecordsFilter({ children, recordID, page, ordering, gender, religion, search }){
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [data, setData] = useState(null);
    const [index, setIndex] = useState([]);

    const [cookies] = useCookies();

    useEffect(() => {
        const controller = new AbortController();

        const exprs = [];
        if(gender) exprs.push(`Gender=='${gender}'`);
        if(religion) exprs.push(`Religion=='${religion}'`);

        const params = {
            __dropna__axis: 1,
            ordering: ordering,
            page,
            columns: 'Family Name,First Name,Middle Name,Gender,Place of Birth,House Number,Religion,\'Street, Purok, Sitio, Subd.\',Educational Attainment,'
        };

        if(exprs.length > 0)
            params.__query__expr = exprs.join('&');
        
        if(search && search.value)
            params[`search_${search.target}`] = search.value;

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/dataset/${recordID}/filters`, {
            headers: {
                Authorization: `Token ${cookies[process.env.REACT_APP_AUTH_TOKEN]}`,
            },
            params,
            signal: controller.signal,
        }).then((resp) => {
            const results = resp.data.results;
            console.log(results)
            if(results.columns)
                setColumns(results.columns);
            setRows(results.data || []);
            setData(resp.data || []);
            setIndex(results.index || []);
        });

        return () => {
            controller.abort();
        }

    }, [page, ordering, gender, religion, search]);

    return children(index, columns, rows, data);
}

RecordsFilter.defaultProps = {
    children: () => {},
    page: 1,
}

RecordsFilter.propTypes = {
    recordID: PropTypes.string.isRequired,
    page: PropTypes.number,
    ordering: PropTypes.string.isRequired,
    gender: PropTypes.string,
    religion: PropTypes.string,
    search: PropTypes.shape({
        target: PropTypes.string.isRequired,
        value: PropTypes.string,
    }),
}

export default RecordsFilter;