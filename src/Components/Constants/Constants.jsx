import { Data } from "../index";

export const drawerWidth = 257;
export const drawerWidthClose = 120;
export const sidenavbarElements = [
  // {
  //   id: 1,
  //   name: "Job Data",
  //   path: "/jobs",
  //   icon: <Data.FactoryIcon />,
  // },
  {
    id: 2,
    name: "Bundles Data",
    path: "/bundles",
    icon: <Data.FactoryIcon />,
  },

  {
    id: 3,
    name: "Power Consu.",
    path: "/consumption",
    icon: <Data.BoltIcon />,
  },
  {
    id: 4,
    name: "Stands/RHF Cons.",
    path: "/stands",
    icon: <Data.AssessmentIcon />,
  },
  {
    id: 5,
    name: "Delays",
    path: "/delays",
    icon: <Data.AvTimerIcon />,
  },
];

export const area = [
  { value: "-1", label: "Select Area", disabled: true },
  { value: 0, label: "Both Area" },
  { value: "1", label: "Area 1" },
  { value: "2", label: "Area 2" },
];

export const crews = [
  { value: "NONE", label: "Select Crew", disabled: true },
  { value: "A", label: "Crew A" },
  { value: "B", label: "Crew B" },
  { value: "C", label: "Crew C" },
  { value: "D", label: "Crew D" },
];

export const shifts = [
  { value: "0", label: "Select Shift" },
  { value: "1", label: "SH# 1" },
  { value: "2", label: "SH# 2" },
  { value: "3", label: "SH# 3" },
];
