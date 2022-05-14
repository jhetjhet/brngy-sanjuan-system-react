import { Bar } from "react-chartjs-2";
import PropTypes from 'prop-types';

function EducAttChart({ labels, data }) {

    return (
        <div className="w-full max-w-xl mt-3">
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Educational Attainment',
                            data: data,
                            backgroundColor: ['yellow', 'red', 'blue'],
                            borderColor: 'black',
                            borderWidth: 2,
                            maxBarThickness: 64,
                        },
                    ]
                }}
            />
        </div>
    )
}

EducAttChart.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])),
}

export default EducAttChart;