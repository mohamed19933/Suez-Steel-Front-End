
import Moment from "react-moment";

const consumptionColumns = [
  // {
  //   name: "ID",
  //   cell: (row) => row.ID,
  //   sortable: true,
  //   center: false,
  //   wrap: true,
  //   grow: 0,
  // },
  {
    name: "Q_Date",
    cell: (row) => <Moment date={row.Q_DATE} format="DD/MM/YYYY" />,
    sortable: true,
    center: false,
    wrap: true,
    grow: 1,
  },
  {
    name: "Electric [KWH]",
    cell: (row) => row.ELECTRIC_CONSUMPTION,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Gas [NM²]",
    cell: (row) => row.GAS_CONSUMPTION,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Water [M²]",
    cell: (row) => row.WATER_CONSUMPTION,
    sortable: true,
    center: true,
    wrap: true,
    grow: 1,
  },
];

export default consumptionColumns;
