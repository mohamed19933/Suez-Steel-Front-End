import Moment from "react-moment";

const bundleColumns = [
  {
    name: "TRK_ID",
    cell: (row) => row.TRK_ID,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Creation",
    cell: (row) => (
      <Moment date={row.CREATION_DATE} format="DD/MM/YYYY HH:mm:ss" />
    ),
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Area",
    cell: (row) => row.AREA,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Heat",
    cell: (row) => row.HEAT_CODE,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Wgt",
    cell: (row) => row.WEIGHT,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Len",
    cell: (row) => row.LENGTH,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Bars No.",
    cell: (row) => row.BARS_NO,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },

  // {
  //   name: "NOTE",
  //   cell: (row) => row.note,
  //   sortable: true,
  //   center: true,
  //   wrap: true,
  //   grow: 1,
  // },
  {
    name: "Shift",
    cell: (row) => row.SHIFT + "-" + row.CREW,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  // {
  //   name: "Standard",
  //   cell: (row) => row.bundleStandard,
  //   sortable: true,
  //   center: true,
  //   wrap: true,
  //   grow: 1,
  // },
  {
    name: "Size",
    cell: (row) => row.SIZE,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  // {
  //   name: "Grade",
  //   cell: (row) => row.compatibleSteelGrade,
  //   sortable: true,
  //   center: true,
  //   wrap: true,
  //   grow: 1,
  // },

  // {
  //   name: "IS_MIXED",
  //   cell: (row) => row.isMixed,
  //   sortable: true,
  //   center: true,
  //   wrap: true,
  //   grow: 1,
  // },

  // {
  //   name: "Pr_Status",
  //   cell: (row) => row.printerStatus,
  //   sortable: true,
  //   center: true,
  //   wrap: true,
  //   grow: 1,
  // },
  // {
  //   name: "Prod Data",
  //   cell: (row) => (
  //     <Moment date={row.productionDate} format="DD/MM/YYYY HH:mm:ss" />
  //   ),
  //   sortable: true,
  //   center: true,
  //   wrap: true,
  //   grow: 1,
  // },
];

export default bundleColumns;
