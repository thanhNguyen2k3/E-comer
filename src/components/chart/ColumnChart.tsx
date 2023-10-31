import ReactApexChart from 'react-apexcharts';
import lineChart from './configs/cloumnChart';

function LineChart() {
    if (typeof window !== 'undefined') {
        return (
            <ReactApexChart
                className="full-width"
                options={lineChart.options}
                series={lineChart.series}
                type="area"
                height={350}
                width={'100%'}
            />
        );
    }

    return null;
}

export default LineChart;
