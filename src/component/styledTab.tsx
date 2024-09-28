import { common } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ReactNode } from "react";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  variant?: "standard" | "scrollable" | "fullWidth";
  scrollButtons?: boolean | "auto";
  centered?: boolean;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  darkindicator?: "true";
  className?: string;
}

export const StyledTabs: any = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: (
        <span
          className={`MuiTabs-indicatorSpan ${
            props.darkindicator ? "indicator-color" : ""
          }`}
        />
      ),
    }}
  />
))(({ theme }: any) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#3a3b3b",
  },
  "& .indicator-color": {
    backgroundColor: "#2ebbf2",
    maxWidth: "90%",
  },
}));

interface StyledTabProps {
  label: string | ReactNode;
  dark_text?: any;
}

export const StyledTab: any = styled((props: StyledTabProps) => {
  return <Tab disableRipple {...props} />;
})(({ theme }: any) => ({
  textTransform: "none",
  color: "#3a3b3b",
  "&.Mui-selected": {
    color: "#2ebbf2",
  },
  "&.Mui-focusVisible": {
    backgroundColor: common.black,
  },
}));