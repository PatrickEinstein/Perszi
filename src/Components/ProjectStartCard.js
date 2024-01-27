import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import Image from "../assets/p1.png";
import MyButtons from "./Button";
import { useDispatch } from "react-redux";
import { setSelectedCollection, toggleopenModal } from "../Redux/reducer";
import LinearWithValueLabel from "../Components/ProgressBar";
import { Store } from "../store";
import Checkboxes from "./CheckBox";
import HttpCaller from "./RepositoryService/ApiCaller";
import { StartScraping } from "./RepositoryService/Requests";

function ProjectStartCard({
  store_id,
  id,
  website_url,
  store_method,
  name,
  label,
  mode,
  index,
  isChecked,
  HandleChange,
  scraping_status,
}) {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(true);
  const [moreDetails, setMoredetails] = useState(false);

  const onViewCollection = () => {
    dispatch(
      setSelectedCollection({
        name: name,
        store_id: store_id,
        id: id,
      })
    );
    dispatch(toggleopenModal());
  };

  const onStartScrape = useCallback(async () => {
    await StartScraping(store_id);
  }, [store_id]);

  return display ? (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="flex-start"
      width={"100%"}
      position="relative"
      backgroundColor="aqua"
    >
      <Stack
        direction="row"
        sx={{
          position: "relative",
          marginLeft: 0,
          paddingLeft: 5,
          height: 90,
        }}
      >
        <img
          src={Image}
          alt="Result"
          style={{
            objectFit: "cover",
            height: "auto",
            width: "auto",
          }}
        />
      </Stack>

      <Stack
        justifyContent="space-between"
        sx={{
          width: "50%",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "left",
            textTransform: "lowercase",
          }}
        >
          Store ID : {id} <br />
          Store name : {name} <br />
          Store url : {website_url}
          <br />
          Store method : {store_method}
          <br />
        </Typography>
        <MyButtons
          text={label}
          backgroundColor="white"
          color="blue"
          width={"50%"}
          onClick={() => {
            if (mode === "RESULT") {
              onViewCollection();
            } else if (mode === "CREATE") {
              onStartScrape();
              setDisplay(false);
            } else {
              setMoredetails((prev) => !prev);
            }
          }}
        />{" "}
      </Stack>

      {moreDetails && (
        <Stack
          height="30rem"
          width="30rem"
          backgroundColor="white"
          border="1px solid green"
          borderRadius='20px'
          position="absolute"
          top="1%"
          left="55%"
          zIndex={5}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          p="3rem 1rem"
        >
          <Typography fontWeight="bold" fontSize={20}>
            more information from celery/redis on the scrapping job would be
            shown here
          </Typography>
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
              textAlign: "left",
              textTransform: "lowercase",
            }}
          >
            Store name : {name} <br />
            Store url : {website_url}
            <br />
            Store method : {store_method}
            <br />
          </Typography>
          <MyButtons
            label="Close"
            height={50}
            width="50%"
            text="Close"
            onClick={() => setMoredetails((prev) => !prev)}
          />
        </Stack>
      )}
      {mode === "CREATE" ? (
        <Checkboxes
          isChecked={isChecked[index]}
          setIsChecked={() => HandleChange(id)}
        />
      ) : (
        <Box
          sx={{
            width: "20%",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
              size: 40,
            }}
          >
            Status :<span color="green"> {scraping_status} </span>
          </Typography>
        </Box>
      )}
    </Stack>
  ) : (
    <Typography
      sx={{
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
      }}
    >
      Project : {name} Scraping started
    </Typography>
  );
}

export default ProjectStartCard;
