import React from "react";
import { useSelector } from "react-redux";
import Ongoingproject from "../Pages/Ongoingproject";
import Projectresult from "../Pages/Projectresult";
import Settings from "../Pages/Settings";
import { Stack } from "@mui/material";
import CreateProjectScrape from "../Pages/createprojectscrape";
import ChartSkeleton from "./ChartSkeleton";
import Administrator from "./Administrator";
import Archived from "../Pages/Archived";

const Mainboard = () => {
  const typeofpage = useSelector((state) => state.auth.typeofProfilePage);

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

          case "Archived":
            return <Archived />;

          default:
            <Ongoingproject />;
            break;
        }
      })()}
    </Stack>
  );
};

export default Mainboard;
