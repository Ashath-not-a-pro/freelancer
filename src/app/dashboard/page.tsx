"use client"

import DetailContainer from '@/component/detailContainer';
import { NavBar } from '@/component/navBar'
import { PostTable } from '@/component/postTable';
import { StyledTab, StyledTabs } from '@/component/styledTab';
import UserContext from '@/context/userContext';
import { HomeIcon, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

const Dashboard = () => {
  const router = useRouter()

  const [tab, setTab] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, newValue: any) => {
    setTab(newValue);
  };

  const context = useContext(UserContext)
  const userData = context?.user

  const logout = ()=> {
    localStorage.clear()
    router.push("/login")
  }

  const tabs = [
    {
      label: "Your Posts",
      show: true,
      component: <PostTable user={userData} />,
    },
    { label: "Details", show: true, component: <DetailContainer user={userData}/> },
  ];

  const icons = [<HomeIcon onClick={()=> router.push("/")}/>, <LogOut onClick={()=> logout()}/>]
  
  return (
    <div className='min-h-screen w-full'>
      <NavBar title={"Profile"} icons={icons}/>
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
