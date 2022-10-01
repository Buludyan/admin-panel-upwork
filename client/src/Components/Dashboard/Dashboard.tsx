import React from "react";
import "./Dashboard.scss";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Typography } from "@mui/material";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__inner">
        <div className="dashboard__header">
          <AccountBalanceIcon
            sx={{ fontSize: "3rem", boxSizing: "border-box", mt: "10px" }}
          />
          <div className="dashboard__name">
            <Typography fontWeight={"bold"} fontSize={20}>
              DASHBOARD
            </Typography>
          </div>
        </div>
        <div className="dashboard__pages">
          <div>
            <Typography>Colleges</Typography>
          </div>
          <div>
            <Typography>Articles</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
