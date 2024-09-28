import React from "react";

export const useShowHideWithRecord = (initial: any) => {
    const [object, setObject] = React.useState<any>(initial);
  
    const handleShow = (
      visibleKey: string,
      title: string | null,
      dataKey: string,
      data: any
    ) => {
      setObject({
        ...object,
        [dataKey]: data,
        title: title || "",
        [visibleKey]: true,
      });
    };
    const handleHide = () => {
      setObject(initial);
    };
    const onToggle = (value: any) => {
      setObject({ ...object, [value]: !object[value] });
    };
  
    return { object, handleShow, handleHide, onToggle };
  };