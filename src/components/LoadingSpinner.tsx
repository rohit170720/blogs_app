import React from "react";

const LoadingSpinner: React.FC = () => (
  <div className='fixed inset-0 w-screen h-screen bg-white flex items-center justify-center z-[9999]'>
    <svg
      width='64'
      height='64'
      viewBox='0 0 50 50'
      style={{ animation: "spin 1s linear infinite" }}
    >
      <circle
        cx='25'
        cy='25'
        r='20'
        fill='none'
        stroke='#3498db'
        strokeWidth='5'
        strokeLinecap='round'
        strokeDasharray='90,150'
        strokeDashoffset='0'
      />
      <style>
        {`
                    @keyframes spin {
                        100% { transform: rotate(360deg); }
                    }
                `}
      </style>
    </svg>
  </div>
);

export default LoadingSpinner;
