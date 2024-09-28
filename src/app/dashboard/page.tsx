"use client"

import { NavBar } from '@/component/navBar'
import { StyledTab, StyledTabs } from '@/component/styledTab';
import { Home, HomeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Dashboard = () => {
  const [state, setState]: any = useState({});
  const router = useRouter()

  const [tab, setTab] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, newValue: any) => {
    setTab(newValue);
  };

  const tabs = [
    {
      label: "Your Posts",
      show: true,
      component: <div>post</div>,
    },
    { label: "Details", show: true, component: <div>Details</div> },
    { label: "Love", show: true, component: <div>love</div> },
  ];

  const icons = [<HomeIcon onClick={()=> router.push("/")}/>]
  
  return (
    <div className='min-h-screen w-full'>
      <NavBar title={"Profile"} icons={icons}/>
      <div className="text-secondary text-lg m-2">Welcome {state.name}, {"good morning"} !!</div>
         <div className='border m-2 rounded-md bg-slate-100'>
           <StyledTabs
             value={tab}
             scrollButtons={false}
             variant="scrollable"
             onChange={handleTabChange}
             darkindicator={"true"}
           >
             {tabs.map((item: any, i: number) => {
               if (item?.show) {
                 return (
                   <StyledTab key={i} label={item?.label} dark_text={"true"} />
                 );
               }
             })}
           </StyledTabs>
           <div style={{ overflowY: "auto", marginTop: 10 }}>
             {tabs.map((item: any, i: number) => {
               return (
                 tab == i && (
                   <div key={i} className="m-4 text-base">
                     {item?.component}
                   </div>
                 )
               );
             })}
           </div>
         </div>
    </div>
  )
}

export default Dashboard
