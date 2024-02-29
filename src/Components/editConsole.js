import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { Divider, IconButton, Stack, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UploadWidget from "./DropZone";
import { useMediaQuery } from "@material-ui/core";
import MyButtons from "./Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import MultiLineTextField from "./MultilineText";
import { DELETEProduct, EditProduct } from "./RepositoryService/Requests";

const EditConsole = ({ onClick }) => {
  const job = useSelector((state) => state.auth.product);
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(job?.image_url);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDiscription] = useState("");

  const OnDELETEProduct = React.useCallback(async () => {
    try {
      DELETEProduct(job.id);
      setOpen(false);
    } catch (err) {
      setOpen(false);
    }
  }, []);

  const OnEditProduct = React.useCallback(async () => {
    try {
      const Payload = {
        title: title ? title : job?.title,
        image_url: image ? image : job?.image_url,
        discount_price: discount ? discount : parseInt(job?.discount_price),
        main_price: price ? price : job?.main_price,
        description: description ? description : job?.description,
      };
      EditProduct(job, Payload);
    } catch (err) {
      setOpen(false);
    }
  }, [image, discount, job, price, title, description]);

  return (
    <Stack
      spacing={2}
      sx={{
        padding: "3rem",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <Typography
          sx={{
            color: "blueviolet",
            fontWeight: "bold",
            size: 40,
          }}
        >
          Edit Scraped Results
        </Typography>
        <MyButtons
          text="Back"
          startIcon={<ArrowBackIosIcon />}
          onClick={onClick}
        />
      </Stack>
      <Typography
        sx={{
          color: "blueviolet",
          fontWeight: "bold",
          size: 35,
        }}
      >
        {job?.title}
      </Typography>
      <img
        src={image.length > 10 ? image : Image}
        alt="Result"
        style={{
          objectFit: "contain",
          height: 200,
          width: 200,
        }}
      />
      <Stack spacing={3}>
        <TextField
          id="outlined-basic"
          label="Image"
          variant="outlined"
          placeholder="Image"
          defaultValue={job?.image_url}
          onChange={(e) => setImage(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="title"
          variant="outlined"
          placeholder="Edit title"
          defaultValue={job?.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          placeholder="Edit price"
          defaultValue={job?.main_price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Discount"
          variant="outlined"
          placeholder="Edit discount"
          defaultValue={job?.discount_price}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <MultiLineTextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          placeholder="Edit description"
          defaultValue={job?.description}
          onChange={(e) => setDiscription(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Others"
          variant="outlined"
          placeholder="Edit others"
          // onChange={(e) => setOthers(e.target.value)}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <MyButtons
          text="Delete"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => {
            OnDELETEProduct();
            onClick();
          }}
        />
        <MyButtons
          text="Proceed"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => {
            onClick();
            OnEditProduct();
          }}
        />
      </Stack>
    </Stack>
  );
};

export default EditConsole;
