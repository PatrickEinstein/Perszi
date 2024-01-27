import React, { useCallback, useEffect, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Input, Stack, Typography } from "@mui/material";

import ProjectStartCard from "../Components/ProjectStartCard";
import MyButtons from "../Components/Button";
import BootLoader from "../Components/Bootloader";

import {
  GetAllOngoingStore,
  GetAllStores,
} from "../Components/RepositoryService/Requests";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Ongoingprojec(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [searchParams, setSearchParameter] = useState("");
  const [Store, setAllStores] = useState([]);
  const [open, setOpen] = React.useState(true);

  const getAllOngoingStore = useCallback(async () => {
    const response = await GetAllOngoingStore(currentPage, searchParams);
    setAllStores(response);
    setOpen(false);
  }, [currentPage, searchParams]);

  useEffect(() => {
    getAllOngoingStore();
  }, [getAllOngoingStore, currentPage]);

  return (
    <Stack>
      <Stack justifyContent="center" alignItems="center">
        <Typography
          textAlign="center"
          sx={{
            fontSize: 40,
            color: "brown",
            fontWeight: "bold",
          }}
        >
          Ongoing Projects
        </Typography>
        <input
          type="text"
          onChange={(e) => setSearchParameter(e.target.value)}
          style={{
            height: 30,
            width: 300,
          }}
        />
        <Typography mt="1,.rem">{searchParams}</Typography>
      </Stack>
      <Stack
        sx={{
          height: "75vh",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            width: "0.1rem",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "transparent",
          },

          scrollbarWidth: "none",
          scrollbarGutter: "unset",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            paddingLeft: 0,
            height: "70%",
            width: "auto",
          }}
        >
          <BootLoader open={open} />
          {Store?.map(
            ({ id, website_url, name, store_method, scraping_status }) => (
              <Grid item xs={12} sm={12} md={12} key={id}>
                <Item
                  sx={{
                    paddingLeft: 0,
                    marginLeft: 0,
                    opacity: 1.0,
                    height: "auto",
                    width: "100%",
                  }}
                >
                  <ProjectStartCard
                    mode="ONGOING"
                    id={id}
                    website_url={website_url}
                    name={name}
                    store_method={store_method}
                    scraping_status={scraping_status}
                    label="See more info"
                    Store={Store}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    currentObjects={Store}
                  />
                </Item>
              </Grid>
            )
          )}
        </Grid>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        p="0.1rem 5rem"
        sx={{
          width: "100%",
        }}
      >
        <MyButtons
          width="15%"
          text="Less"
          onClick={() => {
            setCurrentPage((prev) => (prev > 24 ? prev - 25 : prev - 0));
            setPageSize((prev) => (prev > 24 ? prev - 25 : prev - 0));
          }}
        />
        <Typography color="white">
          Showing {currentPage} to {pageSize + 1}
        </Typography>
        <MyButtons
          width="15%"
          text="More"
          onClick={() => {
            setCurrentPage((prev) =>
              prev < Store.length ? prev + 25 : prev + 0
            );
            setPageSize((prev) => (prev < Store.length ? prev + 25 : prev + 0));
          }}
        />
      </Stack>
    </Stack>
  );
}

export default Ongoingprojec;
