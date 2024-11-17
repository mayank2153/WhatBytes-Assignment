"use client"
import React from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Import the context
import { useScore } from "@/app/config/ScoreContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const QuestionAnalysisDoughnutChart = () => {
  // Try to use context, fall back to default values if it fails
  let correctAnswers = 0;
  let totalQuestions = 0;
  
  try {
    const scoreContext = useScore();
    correctAnswers = scoreContext.correctAnswers;
    totalQuestions = scoreContext.totalQuestions;
  } catch (error) {
    console.warn('Score context not available, using default values');
    // You can set default values here
    correctAnswers = 7;
    totalQuestions = 10;
  }

  const incorrectAnswers = totalQuestions - correctAnswers;

  // Create a custom plugin to draw the center image
  const centerImagePlugin = {
    id: 'centerImage',
    afterDraw: (chart) => {
      if (chart.config.options.elements?.center) {
        const ctx = chart.ctx;
        const centerConfig = chart.config.options.elements.center;
        const img = new Image();
        img.src = centerConfig.image;
        
        img.onload = () => {
          const chartArea = chart.chartArea;
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;
          const imageSize = chart.height * 0.25;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, imageSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(
            img,
            centerX - imageSize / 2,
            centerY - imageSize / 2,
            imageSize,
            imageSize
          );
          ctx.restore();
        };
      }
    }
  };

  ChartJS.register(centerImagePlugin);

  const doughnutData = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        label: "Score Breakdown",
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ["#1a8cff", "#e6e6ff"],
        hoverBackgroundColor: ["#1a8cff", "#e6e6ff"],
        borderWidth: 1,
        cutout: "70%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      }
    },
    elements: {
      center: {
        image: 'https://res.cloudinary.com/dhrbg2jbi/image/upload/v1731821460/istockphoto-1282050925-612x612_tlbmvg.jpg'
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md flex flex-col  border border-slate-200">
      <h3 className="text-xl font-bold mb-4 text-black">Question Analysis</h3>
      <div>
        <p className="text-slate-600 font-medium">
          <strong>
            You scored {correctAnswers} questions correct out of{" "}
            {totalQuestions}.
          </strong>
          &nbsp;However, it still needs some improvements.
        </p>
      </div>
      <div className="flex justify-center items-center w-full h-64 md:w-52 md:h-52 m-4 mx-auto relative">
        <Doughnut
          data={doughnutData}
          options={options}
        />
      </div>
    </div>
  );
};

export default QuestionAnalysisDoughnutChart;