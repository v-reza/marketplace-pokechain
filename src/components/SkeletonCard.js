import React from "react";

const SkeletonCard = ({ length = 9, width, height }) => {
  return (
    <>
      {new Array(length).fill(0).map((_, index) => (
        <div key={index}>
          <div
            className={`${height || "h-56"} ${
              width || "w-56"
            } animate-pulse bg-gray-700 rounded-lg`}
          />
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
