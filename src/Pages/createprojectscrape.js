import React, { useCallback, useEffect, useState } from "react";
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
import Checkboxes from "../Components/CheckBox";
import HttpCaller from "../Components/RepositoryService/ApiCaller";
import {
  GetAllStores,
  SearchStore,
} from "../Components/RepositoryService/Requests";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CreateProjectScrape(props) {
  const dispatch = useDispatch();
  const [Store, setAllStores] = useState([]);
  const [searchParams, setSearchParameter] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isChecked, setIsChecked] = useState({});
  const [masterCheckboxState, setMasterCheckboxState] = useState(false);

  const handleMasterCheckboxChange = () => {
    const newMasterState = !masterCheckboxState;
    setMasterCheckboxState(newMasterState);

    const updatedCheckboxStates = {};
    Object.keys(isChecked).forEach((key) => {
      updatedCheckboxStates[key] = newMasterState;
    });
    setIsChecked(updatedCheckboxStates);
  };

  const HandleChange = (id) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };


  const getAllStoresCallback = useCallback(async () => {
    setOpen(true);
    const response = await GetAllStores(currentPage,searchParams);
    setAllStores(response);
    setOpen(false);
  }, [currentPage,searchParams]);

  useEffect(() => {
  
    getAllStoresCallback();
 
  }, [getAllStoresCallback, currentPage]);

  return (
    <Stack>
      <Stack justifyContent="center" alignItems="center">
        <Stack direction="row" justifyContent="space-between" width="60%">
          <Stack>
            <Typography
              textAlign="center"
              sx={{
                color: "brown",
                fontWeight: "bold",
                fontSize: 40,
              }}
            >
              Create Projects
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
          <Stack direction="row" justifyContent="space-between">
            <Typography mt="1.0rem">Select Many</Typography>{" "}
            <Checkboxes
              setIsChecked={handleMasterCheckboxChange}
              isChecked={masterCheckboxState}
            />
          </Stack>
        </Stack>
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
            height: "auto",
            // width: "100%",
          }}
        >
          {open ? (
            <BootLoader open={open} />
          ) : (
            Store.map(
              (
                {
                  store_id,
                  id,
                  website_url,
                  name,
                  store_method,
                  image_url,
                  status,
                },
                index
              ) => (
                <Grid item xs={12} sm={12} md={12} key={id}>
                  <Item
                    sx={{
                      paddingLeft: 0,
                      marginLeft: 0,
                      opacity: 1.0,
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <ProjectStartCard
                      mode="CREATE"
                      store_id={store_id}
                      id={store_id}
                      website_url={website_url}
                      name={name}
                      store_method={store_method}
                      label="Start project Scrape"
                      index={index}
                      HandleChange={HandleChange}
                      isChecked={isChecked}
                      setIsChecked={setIsChecked}
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
        p="0.1rem 2rem"
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

export default CreateProjectScrape;
