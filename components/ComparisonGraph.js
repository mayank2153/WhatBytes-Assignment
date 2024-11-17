import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useRef, useState } from "react";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const ComparisonGraph = ({ percentile }) => {
  const chartRef = useRef();
  const [weightedAverage] = useState(72);
  const [data] = useState({
    labels: ["0", "10", "21", "30", "30", "30 ", "35", "40", "47", "50", "57","59","70","81","90","100"],
    datasets: [
      {
        label: "Number of Students",
        data: [3, 5, 10, 15, 17, 20, 35, 40, 59, 46, 20,12,9,6,16,6],
        borderColor: "rgba(44, 13, 122)",
        borderWidth: 1,
        backgroundColor: "rgba(102, 102, 255, 0.2)",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: 'black',
        bodySpacing: 4,
        padding: 12,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return 'Statistics';
          },
          label: function (context) {
            const value = context.label;
            const count = context.raw;
            return [`${value}`, `numberOfStudent: ${count}`];
          },
          labelTextColor: function(context) {
            return context.dataIndex === 0 ? 'black' : '#666666';
          }
        },
      },
      annotation: {
        annotations: {
          percentileLine: {
            type: "line",
            xMin: percentile,
            xMax: percentile,
            borderColor: "rgba(181, 180, 184)",
            borderWidth: 1,
            label: {
              content: "your percentile",
              enabled: true,
              position: "start",
              backgroundColor: "rgba(255, 255, 255, 1)",
              font: {
                size: 12,
                weight: "bold",
              },
              padding: 10,
              color: "black",
            },
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 100,
        grid: {
          display: false,
        },
        title: {
          display: false,
          text: "Percentile",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        title: {
          display: false,
          text: "Number of Students",
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-md  p-4 border border-slate-200">
      <h2 className="text-lg font-bold mb-4 text-black">Comparison Graph</h2>
      <div className="mb-4 p-3">
        <p className="text-l font-medium text-slate-600">
          <strong>You scored {percentile}% percentile</strong>, which is{" "}
          {percentile < weightedAverage ? "lower" : "higher"} than the average
          percentile {weightedAverage}% of all the engineers who took this
          assessment.
        </p>
      </div>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default ComparisonGraph;