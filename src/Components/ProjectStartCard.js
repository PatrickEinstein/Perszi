import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Image from "../assets/p1.png";
import MyButtons from "./Button";
import { useDispatch } from "react-redux";
import { setSelectedCollection, toggleopenModal } from "../Redux/reducer";
import Checkboxes from "./CheckBox";
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
  scraping_status,
  category_url,
  update_at,
  created_at,
  handleChange,
  checkedList,
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
      alignItems="centre"
      boxShadow="1px 1px  gold"
      height="100%"
    >
      <Stack
        justifyContent="space-between"
        sx={{
          width: "80%",
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontWeight: "bold",
            textAlign: "left",
            textTransform: "lowercase",
            // fontFamily: "sofia, sans-serif",
          }}
        >
          Store ID : {id} <br />
          Store name : {name} <br />
          Store url : {website_url}
          category url: category_url
          <br />
          Store method : {store_method}
          <br />
          updated: {update_at?.split("T")[0]}
          <br />
          Created: {created_at?.split("T")[0]}
        </Typography>
        <MyButtons
          text={label}
          backgroundColor="gold"
          color="black"
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
        />
      </Stack>

      {moreDetails && (
        <Stack
          height="30rem"
          width="30rem"
          backgroundColor="white"
          border="1px solid green"
          borderRadius="20px"
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
        // <Button
        //   sx={{
        //     backgroundColor:
        //       checkedList.includes(store_id) === true ? "blue" : "red",
        //   }}
        //   onClick={() => handleChange(store_id)}
        // />

        <Switch
          checked={checkedList.includes(store_id)}
          onChange={() => handleChange(store_id)}
          inputProps={{ "aria-label": "controlled" }}
        />
      ) : (
        <Box
          sx={{
            width: "20%",
          }}
        >
          <Typography
            sx={{
              color: "blue",
              fontWeight: "bold",
              size: 40,
            }}
          >
            Status : {scraping_status}
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
