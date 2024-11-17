"use client";

import React, { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [rank, setRank] = useState(1);
  const [percentile, setPercentile] = useState(30);
  const [correctAnswers, setCorrectAnswers] = useState(10);
  const [totalQuestions,setTotalQuestions] = useState(15);

  return (
    <ScoreContext.Provider
      value={{ rank, setRank, percentile, setPercentile, correctAnswers, setCorrectAnswers, totalQuestions }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
