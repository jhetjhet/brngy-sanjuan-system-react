import { Fragment, useState } from "react";
import PivotTable from "../../PivotTable";
import Table from "../../Table";
import ReligionChart from "../Charts/ReligionChart";


export default function ReligionChartPage(){
    const [chartData, setChartData] = useState();

    const onChartLoad = (data, err) => {
        if (data && data.__id) {
            data = data.__id;
            setChartData({
                labels: Object.keys(data),
                data: Object.values(data),
            });
        }
    }

    return (
        <div className="flex flex-col items-center pt-12">
            <PivotTable 
                index={['Religion']}
                values={['__id']}
                onLoad={onChartLoad}
            />
            <h1 className="text-xl text-center md:text-2xl font-semibold">Household Population By Religion</h1>
            {chartData && (
                <Fragment>
                    <ReligionChart 
                        labels={chartData.labels}
                        data={chartData.data}
                    />
                    <div className="mt-3 w-full max-w-xl">
                        <Table 
                            columns={['Religion', 'Count']}
                            rows={chartData.labels.map((d, i) => [d, chartData.data[i]])}
                        />
                    </div>
                </Fragment>
            )}
        </div>
    );
}