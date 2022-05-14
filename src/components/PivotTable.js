import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function PivotTable({ index, values, columns, aggfunc, onLoad }) {
    const [loadedExcel, setLoadedExcel] = useState(null);

    const [cookies] = useCookies();

    useEffect(() => {
        axios.get('http://localhost:8000/api/dataset/loaded/', {
            headers: {
                Authorization: `Token ${cookies[process.env.REACT_APP_AUTH_TOKEN]}`,
            }
        }).then((resp) => {
            setLoadedExcel(resp.data.id);
        });
    });

    useEffect(() => {
        if (!loadedExcel)
            return;

        const params = {
            index: index.join(','),
            values: values.join(','),
            columns: columns.join(','),
            aggfunc: aggfunc,
        }

        axios.get(`http://localhost:8000/api/dataset/${loadedExcel}/pivot/`, {
            params,
            headers: {
                Authorization: `Token ${cookies[process.env.REACT_APP_AUTH_TOKEN]}`,
            }
        }).then((resp) => {
            onLoad(resp.data, null);
        }).catch((err) => onLoad(null, err));
    }, [loadedExcel]);

    return null;
}

PivotTable.defaultProps = {
    columns: [],
    aggfunc: 'count_nonzero',
    onLoad: () => {},
}

PivotTable.propTypes = {
    index: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string),
    aggfunc: PropTypes.string,
    onLoad: PropTypes.func,
}

export default PivotTable;