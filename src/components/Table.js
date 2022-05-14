import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Table({ rows, columns }) {

    return (
        <div className="w-full px-3">
            <div className="w-full overflow-auto">
                <table className="w-full">
                    <thead className="bg-yellow-300">
                        <tr className="">
                            {columns.map((column, key) => (
                                <th className="border border-black font-semibold" key={key}>
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, k) => (
                            <tr className="bg-gray-100" key={k}>
                                {row.map((data, kd) => {
                                    if (data && typeof data === 'object')
                                        return (
                                            <td className="text-sm border border-black text-center text-blue-500 hover:underline" key={kd}>
                                                <Link to={data.link} replace>
                                                    {data.value}
                                                </Link>
                                            </td>
                                        );
                                    return (
                                        <td className="text-sm border border-black text-center" key={kd}>
                                            {data}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            value: PropTypes.string,
            link: PropTypes.string,
        }),
    ]))),
}

export default Table;