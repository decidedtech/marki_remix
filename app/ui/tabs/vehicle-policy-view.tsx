'use client';  
import { useState } from 'react';

const VehiclePolicyViewTabs = ({ tabs }:any) => {
  const [activeTab, setActiveTab] = useState(0);  

  return (
    <div className="w-full  ">
       <div className="tabs tabs-sm tabs-boxed flex overflow-x-auto">
        {tabs.map((tab:any, index:number) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}  
            className={`tab  sm:w-auto transition ${
              activeTab === index ? 'bg-slate-800 rounded text-white' : 'text-red-900'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      
      <div className={`p-3 bg-white   ${activeTab !== null ? 'block' : 'hidden'}`}>
        {tabs[activeTab]?.content}  
      </div>
    </div>
  );
};

export default VehiclePolicyViewTabs;
