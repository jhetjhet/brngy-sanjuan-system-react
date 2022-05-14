import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useCookies } from "react-cookie";
import PropTypes from 'prop-types';

function GenderChart({ labels, data }) {

    return (
        <div className="w-full max-w-xl mt-3">
            <Bar
                options={{
                }}
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Gender',
                            data: data,
                            maxBarThickness: 64,
                            backgroundColor: ['pink', 'blue'],
                            borderColor: 'black',
                            borderWidth: 2,
                        },
                    ]
                }}
            />
        </div>
    )
}

GenderChart.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])),
}

export default GenderChart;