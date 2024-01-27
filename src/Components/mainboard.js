import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Ongoingproject from "../Pages/Ongoingproject";
import Projectresult from "../Pages/Projectresult";
import Settings from "../Pages/Settings";
import { Stack } from "@mui/material";
import CreateProjectScrape from "../Pages/createprojectscrape";
import ChartSkeleton from "./ChartSkeleton";
import Administrator from "./Administrator";

const Mainboard = () => {
  const typeofpage = useSelector((state) => state.user.typeofProfilePage);

  return (
    <Stack
      sx={{
        height: "100%",
      }}
    >
      {(() => {
        switch (typeofpage) {
          case "Create Project":
            return <CreateProjectScrape />;
          case "Ongoing Project":
            return <Ongoingproject />;

          case "Project Result":
            return <Projectresult />;

          case "Settings":
            return <Settings />;

          case "Administrator":
            return <Administrator />;

          case "Dashboard":
            return <ChartSkeleton />;

          default:
            <Ongoingproject />;
            break;
        }
      })()}
    </Stack>
  );
};

export default Mainboard;
