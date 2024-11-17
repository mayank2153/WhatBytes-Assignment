import React from "react";

const UpdateButton = ({ onClick }) => {
  return (
    <div className="flex items-center cursor-pointer  justify-between gap-4">
      <div>
        <img className="md:w-16 " src="https://res.cloudinary.com/dhrbg2jbi/image/upload/e_improve/v1731833372/images_wi9rat.png" alt="html" />
      </div>
      <div className=" md:text-md ">
        <strong className=" text-black">Hyper Text Markup Language</strong>
        <p className="text-gray-500">
          Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
        </p>
      </div>
      <button
        onClick={onClick}
        className="text-sm  py-2 md:px-6 px-2 bg-blue-900 text-white rounded hover:bg-blue-800"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateButton;
