import React from "react";
import StatBox from "../utils/StatBox";
import Topbar from "../constants/Topbar";
import { Box } from "@mui/material";

const StockList = ({ data }) => {
  return (
    <div>
      <Topbar title="Browse Stocks" className="fixed top-0 left-0 right-0" />
      <Box sx={{ m: 2 }}></Box>
      {Object.keys(data).map((key) => (
        <StatBox key={key} stockData={data[key]} />
      ))}
    </div>
  );
};

export default StockList;
