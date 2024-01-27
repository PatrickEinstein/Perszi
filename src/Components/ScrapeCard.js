import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import LinearWithValueLabel from "./ProgressBar";
import { Edit, DeleteOutline } from "@mui/icons-material";
import MyButtons from "./Button";
import { useDispatch } from "react-redux";
import { setSelectedCollection, toggleopenModal } from "../Redux/reducer";
function ScrapeCard({ image, name, products, label }) {
  const dispatch = useDispatch();

  const onViewCollection = () => {
    dispatch(
      setSelectedCollection({
        name: name,
        products: products,
      })
    );
    dispatch(toggleopenModal());
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="left"
      width={"100%"}
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
          src={image}
          alt="Result"
          style={{
            objectFit: "cover",
            height: "auto",
            width: "auto",
          }}
        />
      </Stack>
      <Stack spacing={3}>
        <Stack
          sx={{
            width: "auto%",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Store : {name}
          </Typography>
        </Stack>
        <Stack
          sx={{
            height: "80%",
            width: "auto",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            <MyButtons
              text={label}
              backgroundColor="white"
              color="blue"
              width={"100%"}
              onClick={onViewCollection}
            />
          </Typography>
        </Stack>
      </Stack>

      <Box
        sx={{
          width: "20%",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            size: 40,
          }}
        >
          Status
        </Typography>
        {/* <LinearWithValueLabel progress={progress} /> */}
      </Box>
    </Stack>
  );
}

export default ScrapeCard;
