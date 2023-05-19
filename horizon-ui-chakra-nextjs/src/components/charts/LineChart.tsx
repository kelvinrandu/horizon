import dynamic from 'next/dist/shared/lib/dynamic'
import { ChartProps } from './LineAreaChart'
import { ApexOptions } from "apexcharts";

type ApexGeneric = ApexOptions & any;

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface LineChartProps extends ChartProps {}



const categories=[ "JAN", "FEB","MAR", "APR", "MAY", "JUN","JUL","AUG","SEP", "OCT", "NOV", "DEC",]
 const lineChartOptionsTotalSpent: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#4318FF", "#39B8FF"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    // type: "line",
  },
  xaxis: {
    // type: "numeric",
    // categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
    categories: categories,
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
    column: {
      // color: ["#7551FF", "#39B8FF"],
      opacity: 0.5,
    },
  },
  // color: ["#7551FF", "#39B8FF"],
};

export default function LineChart ({
  chartOptions,
  chartData,
  line1,
  line2
}: LineChartProps) {

  const lineChartDataTotalSpent = [
    {
      name: "Revenue",
      data:line1,
    },
    {
      name: "Profit",
      data: line2,
    },
  ];
  return (

    <Chart
      options={lineChartOptionsTotalSpent}
      series={lineChartDataTotalSpent}
      type='line'
      width='100%'
      height='100%'
    />
  )
}
