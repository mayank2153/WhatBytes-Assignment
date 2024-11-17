"use client";

import React, { useState } from "react";
import { useScore } from "@/app/config/ScoreContext";

const UpdateModal = ({ isOpen, onClose, onSave }) => {
  const { rank, setRank, percentile, setPercentile, correctAnswers, setCorrectAnswers } = useScore();

  const [tempRank, setTempRank] = useState(rank);
  const [tempPercentile, setTempPercentile] = useState(percentile);
  const [tempCorrectAnswers, setTempCorrectAnswers] = useState(correctAnswers);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateField = (field, value) => {
    let error = "";
    if (field === "rank") {
      if (!value || isNaN(value) || value <= 0) {
        error = "required | should be number";
      }
    } else if (field === "percentile") {
      if (value === "" || isNaN(value) || value < 0 || value > 100) {
        error = "required | percentile 0-100";
      }
    } else if (field === "correctAnswers") {
      if (value === "" || isNaN(value)) {
        error = "required | should be number";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error === "";
  };

  const handleInputChange = (field, value, setValue) => {
    setValue(value);
    validateField(field, value);
  };

  const handleSaveClick = () => {
    const isValidRank = validateField("rank", tempRank);
    const isValidPercentile = validateField("percentile", tempPercentile);
    const isValidCorrectAnswers = validateField("correctAnswers", tempCorrectAnswers);

    if (isValidRank && isValidPercentile && isValidCorrectAnswers) {
      setRank(tempRank);
      setPercentile(tempPercentile);
      setCorrectAnswers(tempCorrectAnswers);
      onSave();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/5 max-[1100px]:w-11/12">
        <div className="flex justify-between p-4">
          <h2 className="text-lg font-bold mb-4 text-black">Update Score</h2>
          <img className="w-12 mr-5" src="https://res.cloudinary.com/dhrbg2jbi/image/upload/e_improve/v1731833372/images_wi9rat.png" alt="LOGO" />
        </div>

        {[{ label: "Rank", value: tempRank, setValue: setTempRank, error: errors.rank, field: "rank" },
          { label: "Percentile", value: tempPercentile, setValue: setTempPercentile, error: errors.percentile, field: "percentile" },
          { label: "Current Score (out of 15)", value: tempCorrectAnswers, setValue: setTempCorrectAnswers, error: errors.correctAnswers, field: "correctAnswers" },
        ].map(({ label, value, setValue, error, field }, index) => (
          <div key={field} className="mb-7 flex items-center justify-between max-[1100px]:flex-col w-full">
            <div className="flex max-[1100px]:mb-2 w-full">
              <p className="bg-blue-900 rounded-full w-6 h-6 font-bold text-white mr-2 text-center">
                {index + 1}
              </p>
              <p className="text-black">
                Update your <strong>{label}</strong>
              </p>
            </div>
            <div className="flex flex-col w-2/5 max-[1100px]:w-4/5">
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value, setValue)}
                className={`p-2 rounded w-full border text-black focus:outline-none focus:ring-2 transition-transform duration-300 ${
                  error
                    ? "border-red-500 focus:ring-red-500 transform -translate-x-3"
                    : "border-blue-700 focus:ring-blue-500"
                }`}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 text-black rounded border border-black mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="py-2 px-8 bg-blue-800 text-white rounded hover:bg-blue-600"
          >
            Save →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
