"use client"; // Client-side component

import { useState } from "react";
import UpdateButton from "./UpdateButton";
import UpdateModal from "./UpdateModal";
import ComparisonGraph from "./ComparisonGraph";
import { useScore } from "@/app/config/ScoreContext";

const QuickStatistics = () => {
  const { rank, setRank, percentile, setPercentile, correctAnswers, setCorrectAnswers } = useScore();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="p-4 bg-white shadow-md rounded-md  border border-slate-200">
        <UpdateButton onClick={handleUpdateClick} />
        <UpdateModal
          isOpen={isEditing}
          onClose={handleCloseModal}
          rank={rank}
          setRank={setRank}
          percentile={percentile}
          setPercentile={setPercentile}
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
          onSave={handleSaveClick}
        />
      </div>
      <div className="p-4 bg-white shadow-md rounded-md  cursor-pointer">
        <h2 className="text-lg font-bold mb-4 text-black">Quick Statistics</h2>
        <div className="flex justify-between mb-4 px-6 max-[750px]:flex-col items-start">
          <div className="flex items-center">
            <p className="bg-slate-200 p-3 mr-2 text-2xl rounded-full max-[750px]:mb-5">🏆</p>
            <div>
              <strong className="text-xl text-black">{rank}</strong>
              <p className="text-gray-500">Your Rank</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="bg-slate-200 p-3 mr-2 text-xl rounded-full max-[750px]:mb-5">🗒️</p>
            <div>
              <strong className="text-xl text-black">{percentile}%</strong>
              <p className="text-gray-500">Percentile</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="bg-slate-200 p-3 mr-2 text-xl rounded-full max-[750px]:mb-5">✅</p>
            <div>
              <strong className="text-xl text-black">{correctAnswers}</strong>
              <p className="text-gray-500">Correct Answers</p>
            </div>
          </div>
        </div>
      </div>
      <ComparisonGraph percentile={percentile} />
    </>
  );
};

export default QuickStatistics;
