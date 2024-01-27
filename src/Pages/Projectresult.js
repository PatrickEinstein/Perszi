import React, { useCallback, useEffect, useMemo, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { ImageLinks } from "../Demodata";
import ProjectStartCard from "../Components/ProjectStartCard";
import { Store } from "../store";
import MyButtons from "../Components/Button";
import { useDispatch } from "react-redux";
import { setOpenLoader } from "../Redux/reducer";
import BootLoader from "../Components/Bootloader";
import HttpCaller from "../Components/RepositoryService/ApiCaller";
import {
  GetAllStores,
  GetAllStoresResult,
  SearchStore,
} from "../Components/RepositoryService/Requests";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Projectresult(props) {
  const dispatch = useDispatch();
  const [Stores, setAllStores] = useState([]);
  const [searchParams, setSearchParameter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = React.useState(true);

  const getAllStoresResult = useCallback(async () => {
    const response = await GetAllStoresResult(currentPage, searchParams);
    setAllStores(response);
    setOpen(false);
  }, [currentPage, searchParams]);

  useEffect(() => {
    getAllStoresResult();
  }, [getAllStoresResult, currentPage]);

  const theme = useTheme();
  return (
    <Stack>
      <Stack justifyContent="center" alignItems="center">
        <Typography
          sx={{
            fontSize: 40,
            color: "brown",
            fontWeight: "bold",
          }}
        >
          Projects Results
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
            width: "100%",
          }}
        >
          {open ? (
            <BootLoader open={open} />
          ) : (
            Stores?.map(
              ({
                id,
                website_url,
                name,
                store_method,
                store_id,
                scraping_status,
              }) => (
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
                      scraping_status={scraping_status}
                      mode="RESULT"
                      id={store_id}
                      website_url={website_url}
                      name={name}
                      store_method={store_method}
                      label="See Products"
                      Store={Store}
                      currentPage={currentPage}
                    />
                  </Item>
                </Grid>
              )
            )
          )}
        </Grid>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        p="2rem 5rem"
        sx={{
          width: "100%",
        }}
      >
        <MyButtons
          width="15%"
          text="Less"
          onClick={() => {
            setCurrentPage((prev) => (prev > 0 ? prev - 1 : null));
          }}
        >
          Previous
        </MyButtons>
        <Typography color="blue">{currentPage}</Typography>
        <MyButtons
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

export default Projectresult;
