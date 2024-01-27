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
import { EditProduct } from "./RepositoryService/Requests";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        // onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const EditConsole = ({ onClick }) => {
  const job = useSelector((state) => state.user.product);
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(job?.image_url);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDiscription] = useState("");

  console.log({ ProductInfo: job });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(true);

  const OnEditProduct = React.useCallback(async () => {
    try {
      const Payload = {
        title: title ? title : job?.title,
        image_url: image ? job?.image_url : job?.image_url,
        discount_price: discount ? discount : parseInt(job?.discount_price),
        main_price: price ? price : job?.main_price,
        description: description ? description : job?.description,
      };
      EditProduct(job, Payload);
    } catch (err) {
      setOpen(false);
    }
  },[image,discount,job,price,title,description]);

  const style = {
    transform: "translate(20%, 5%)",
    width: isNonMobileScreen ? "65%" : "65%",
    overflow: "auto",
    height: 720,
    // maxHeight: isNonMobileScreen ? "100%" : 500,
    bgcolor: "background.paper",
    opacity: 1.0,
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
    overflow: isNonMobileScreen ? "auto" : "scroll",
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
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade
          in={open}
          sx={{
            borderRadius: 10,
          }}
        >
          <Stack spacing={2} sx={style}>
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
            <UploadWidget
              image={image}
              setImage={setImage}
              // job={selectedJob.image}
            />
            <Stack spacing={3}>
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <MyButtons
                text="Proceed"
                startIcon={<ArrowBackIosIcon />}
                onClick={() => {
                  onClick();
                  OnEditProduct();
                }}
              />
              <MyButtons
                text="Delete"
                startIcon={<ArrowBackIosIcon />}
                onClick={onClick}
              />
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditConsole;
