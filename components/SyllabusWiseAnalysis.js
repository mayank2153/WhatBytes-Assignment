import React from 'react';

const SyllabusWiseAnalysis = () => {
  const skills = [
    { name: "HTML Tools, Forms, History", percentage: 80 },
    { name: "Tags & References in HTML", percentage: 60 },
    { name: "Tables & References in HTML", percentage: 24 },
    { name: "Tables & CSS Basics", percentage: 96 },
  ];

  // Helper function that returns complete Tailwind classes instead of dynamic strings
  const getColorClasses = (percentage) => {
    if (percentage > 90) {
      return {
        bar: 'bg-green-500',
        text: 'text-green-500'
      };
    }
    if (percentage > 75) {
      return {
        bar: 'bg-blue-500',
        text: 'text-blue-500'
      };
    }
    if (percentage > 50) {
      return {
        bar: 'bg-orange-500',
        text: 'text-orange-500'
      };
    }
    return {
      bar: 'bg-red-500',
      text: 'text-red-500'
    };
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg  border border-slate-200">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Syllabus Wise Analysis
      </h2>
      <div className="space-y-8">
        {skills.map((skill, index) => {
          const colorClasses = getColorClasses(skill.percentage);
          
          return (
            <div key={index} className="animate-fadeIn">
              <div className="flex justify-between mb-2 text-gray-700">
                <span className="font-medium">{skill.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ease-out ${colorClasses.bar}`}
                    style={{ width: `${skill.percentage}%` }}
                    role="progressbar"
                    aria-valuenow={skill.percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${skill.percentage}% proficiency in ${skill.name}`}
                  />
                </div>
                <span className={`font-semibold min-w-[3rem] ${colorClasses.text}`}>
                  {skill.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SyllabusWiseAnalysis;