import React, { useCallback, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import {  Stack, Typography } from "@mui/material";

import ProjectStartCard from "../Components/ProjectStartCard";
import MyButtons from "../Components/Button";
import BootLoader from "../Components/Bootloader";

import {

  GetAllinprogress,
} from "../Components/RepositoryService/Requests";



function Ongoingprojec(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [searchParams, setSearchParameter] = useState("");
  const [Store, setAllStores] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [pageCount, setPageCount] = useState(1);

  const getAllOngoingStore = useCallback(async () => {
    const response = await GetAllinprogress(currentPage, searchParams);
    // const response = await GetAllOngoingStore(currentPage, searchParams);
    setAllStores(response.results);
    setPageCount(Math.ceil(response.count / 10));

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
            ({
              id,
              website_url,
              name,
              store_method,
              scraping_status,
              category_url,
            }) => (
              <Grid item xs={12} sm={12} md={6} key={id}>
                <ProjectStartCard
                  mode="ONGOING"
                  id={id}
                  website_url={website_url}
                  category_url={category_url}
                  name={name}
                  store_method={store_method}
                  scraping_status={scraping_status}
                  label="See more info"
                  Store={Store}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  currentObjects={Store}
                />
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
            setCurrentPage((prev) => prev - 1);
          }}
        />
        <Typography color="blue">{currentPage}</Typography>
        <MyButtons
          disabled={pageCount === currentPage ? true : false}
          width="15%"
          text="More"
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          More
        </MyButtons>
      </Stack>
    </Stack>
  );
}

export default Ongoingprojec;
