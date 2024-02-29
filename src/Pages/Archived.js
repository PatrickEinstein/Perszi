import React, { useCallback, useEffect, useMemo, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProjectStartCard from "../Components/ProjectStartCard";
import { Store } from "../store";
import MyButtons from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";

import BootLoader from "../Components/Bootloader";
import { GetAllArchived, GetAllScrapped } from "../Components/RepositoryService/Requests";
import Console from "../Components/console";
import { toggleopenModal } from "../Redux/reducer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Archived(props) {
  const dispatch = useDispatch();
  const [Stores, setAllStores] = useState([]);
  const [searchParams, setSearchParameter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = React.useState(true);
  const [pageCount, setPageCount] = useState(1);
  const openModal = useSelector((state) => state.auth.openModal);

  const getAllStoresResult = useCallback(async () => {
    const response = await GetAllArchived(currentPage, searchParams);
    setAllStores(response.results);
    setPageCount(Math.ceil(response.count / 10));
    setOpen(false);
  }, [currentPage, searchParams]);

  useEffect(() => {
    getAllStoresResult();
  }, [getAllStoresResult, currentPage]);

  const theme = useTheme();
  return (
    <Stack>
      <Stack justifyContent="center" alignItems="center" sx={{}}>
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
                category_url,
                created_at,
                update_at
              }) => {
                return (
                  <Grid item xs={12} sm={12} md={6} key={id}>
                    <ProjectStartCard
                      scraping_status={scraping_status}
                      category_url={category_url}
                      mode="RESULT"
                      store_id={store_id}
                      id={id}
                      website_url={website_url}
                      name={name}
                      store_method={store_method}
                      label="See Products"
                      Store={Store}
                      currentPage={currentPage}
                      update_at={update_at}
                      created_at={created_at}
                    />
                  </Grid>
                );
              }
            )
          )}
        </Grid>
        {openModal ? (
          <div
            style={{
              position: "absolute",
              width: "80%",
              zIndex: 3,
              backgroundColor: "white",
              overflow: "auto",
              height: "80%",
              opacity: 1.0,
              border: "2px solid #000",
              boxShadow: 24,
              borderRadius: 8,
              p: 4,
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
            <Console onClick={() => dispatch(toggleopenModal())} />
          </div>
        ) : null}
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

export default Archived;
