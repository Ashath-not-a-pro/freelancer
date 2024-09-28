import React from "react";

export const NavBar = (props: any) => {
  const { title, icons = [] } = props;
  return (
    <div className="h-16 bg-secondary flex items-center justify-between">
      <div className="ml-2 text-xl font-semibold">{title}</div>
      <div className="m-2 flex space-x-3">
          {
            icons.map((item:any) => item)
          }
      </div>
    </div>
  );
};
