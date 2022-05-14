import { Bar } from "react-chartjs-2";

function ReligionChart({ labels, data }) {

    return (
        <div className="w-full max-w-xl mt-3">
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Religion',
                            data: data,
                            backgroundColor: ['green', 'purple', 'orange'],
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

export default ReligionChart;