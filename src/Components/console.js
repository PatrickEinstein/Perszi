import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { Divider, IconButton, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MyButtons from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  selectedProductId,
  setOpenLoader,
  toggleopenModal2,
} from "../Redux/reducer";
import BootLoader from "./Bootloader";
import HttpCaller from "./RepositoryService/ApiCaller";
import {
  GetAllProducts,
  GetAllStores,
  PublishProducts,
} from "./RepositoryService/Requests";

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

const Console = ({ onClick }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user.selectedCollection);
  const [Products, setAllProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [openLoader, setOpenLoder] = React.useState(true);
  const open = useSelector((state) => state.user.openModal);

  const getAllStoresCallback = React.useCallback(async () => {
    const response = await GetAllProducts(store.id);
    setAllProducts(response);
  }, [store]);

  const onPublish = React.useCallback(async (store_id) => {
    const response = await PublishProducts(store_id);
    // alert(response.message);
  }, []);

  React.useEffect(() => {
    getAllStoresCallback();
    setOpenLoder(false);
  }, [getAllStoresCallback, store.id]);

  console.log(`store-info==>`, store);

  const style = {
    transform: "translate(20%, 3%)",
    width: "70%",
    overflow: "auto",
    height: 700,
    bgcolor: "background.paper",
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
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        // onClose={handleClose}
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
            <Stack spacing={2}>
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
                  Perzi Ai-Scraper
                </Typography>
                <Typography
                  sx={{
                    color: "blueviolet",
                    fontWeight: "bold",
                    size: 40,
                  }}
                >
                  Products in {store.name} store
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
                  size: 40,
                }}
              >
                {/* Store: {name} */}
              </Typography>
              {openLoader ? (
                <>
                  {" "}
                  <Typography> Fetching Products ...</Typography>
                  <BootLoader open={openLoader} />
                </>
              ) : Products.length > 0 ? (
                Products?.map(
                  ({
                    image_url,
                    id,
                    currency_symbol,
                    discount_price,
                    description,
                    main_price,
                    title,
                    store_id,
                  }) => (
                    <Stack
                      p="1rem 0.5rem"
                      sx={{
                        backgroundColor: "aqua",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "blueviolet",
                          fontWeight: "bold",
                          size: 35,
                        }}
                      >
                        {title}
                      </Typography>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="left"
                        width={"100%"}
                        sx={{
                          background:
                            "linear-gradient(to right, #4FA2FF, #000000)",
                          paddingTop: 1,
                          paddingBottom: 1,
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            position: "relative",
                            marginLeft: 0,
                            paddingLeft: 0,
                            height: 100,
                          }}
                        >
                          <IconButton
                            sx={{
                              color: "white",
                              left: "15%",
                            }}
                            onClick={() => {
                              dispatch(toggleopenModal2());
                              dispatch(
                                selectedProductId({
                                  image_url,
                                  id,
                                  currency_symbol,
                                  discount_price,
                                  description,
                                  main_price,
                                  title,
                                })
                              );
                            }}
                          >
                            <Edit
                              sx={{
                                fontSize: 40,
                              }}
                            />
                          </IconButton>
                          <img
                            src={image_url}
                            alt="Result"
                            style={{
                              objectFit: "contain",
                              height: "100%",
                              width: "100%",
                            }}
                          />
                        </Stack>
                        <Box
                          sx={{
                            width: "50%",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "white",
                              fontWeight: "bold",
                              size: 40,
                            }}
                          >
                            Price: {currency_symbol} {main_price}
                            <br />
                            Discount: {discount_price}
                            <br />
                            Description : {description}
                            <br />
                          </Typography>
                        </Box>
                        <MyButtons
                          text="Publish"
                          onClick={() => onPublish(store_id)}
                        />
                      </Stack>
                    </Stack>
                  )
                )
              ) : (
                <Typography>No Products Found for store </Typography>
              )}
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              p="2rem 5rem"
              sx={{
                width: "60%",
                transform: "translate(40%, 3%)",
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
        </Fade>
      </Modal>
    </div>
  );
};

export default Console;
