import React from "react";
import "../index.css";

function NavigationBar() {
  return (
    <div className="sticky top-0 inset-x-0 h-20 bg-transparent">
      <div className="flex justify-between items-center px-6 ">
        <div className="py-4 px-4">
          <span className="dancingScriptFont text-5xl font-bold">Roberta</span>
        </div>
        <div>
          <button>Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
