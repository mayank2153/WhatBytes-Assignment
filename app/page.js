"use client"
import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import QuickStatistics from "../components/QuickStatistics";
import SyllabusWiseAnalysis from "../components/SyllabusWiseAnalysis";
import QuestionAnalysis from "../components/QuestionAnalysis";
import Sidebar from "@/components/Sidebar";
import { ScoreProvider } from "./config/ScoreContext";

export default function Home() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <ScoreProvider>
      <div className="bg-white">

        <Header toggleSidebar={toggleSidebar} />

        <main className="min-h-screen flex mt-20 bg-white">
          <Sidebar isOpen={isSidebarVisible} toggleSidebar={toggleSidebar} />

          <div className=" bg-white p-4 ">
            <p className=" text-[#7a7a7a] md:text-xl text-2xl">Skill Test</p>
            <div className="flex md:flex-row flex-col px-2 gap-4">
              <div className="flex flex-col gap-4">
                <QuickStatistics />
              </div>

              <div className="flex flex-col  gap-4">
                <SyllabusWiseAnalysis />
                <QuestionAnalysis />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ScoreProvider>
  );
}
