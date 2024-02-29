import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MyButtons from "./Button";
import { useSelector, useDispatch } from "react-redux";
import Image from "../assets/p1.png";
import { selectedProductId, toggleopenModal2 } from "../Redux/reducer";
import BootLoader from "./Bootloader";
import { GetAllProducts, PublishProducts } from "./RepositoryService/Requests";
import { Edit } from "@mui/icons-material";
import EditConsole from "./editConsole";

const Console = ({ onClick }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.selectedCollection);
  const [Products, setAllProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [openLoader, setOpenLoder] = React.useState(true);
  const openModal2 = useSelector((state) => state.auth.openModal2);
  const getAllStoresCallback = React.useCallback(async () => {
    const response = await GetAllProducts(store.id);
    setAllProducts(response);
    setOpenLoder(false);
  }, []);

  const onPublish = React.useCallback(async (store_id) => {
    const response = await PublishProducts(store_id);
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      getAllStoresCallback();
    }, 5000);
  }, [store.id]);

  return (
    <div spacing={2}>
      <Stack>
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
              color: "green",
              fontWeight: "bold",
              size: 40,
            }}
          >
            Perzi Ai-Scraper
          </Typography>
          <Typography
            sx={{
              color: "green",
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

        {openLoader ? (
          <>
            <Typography> Fetching Products ...</Typography>
            <BootLoader open={openLoader} />
          </>
        ) : Products.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{
              paddingLeft: 0,
              width: "100%",
            }}
          >
            {Products?.map(
              ({
                image_url,
                id,
                currency_symbol,
                discount_price,
                description,
                main_price,
                title,
                store_id,
                created_at,
                update_at,
              }) => {
                return (
                  <Grid item xs={6} sm={6} md={6} key={id}>
                    <Stack p="1rem 0.5rem" boxShadow="1px 1px gold" spacing={3}>
                      <Typography
                        sx={{
                          color: "green",
                          fontWeight: "bold",
                          size: 35,
                        }}
                      >
                        {title}
                      </Typography>

                      <Stack direction="row">
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
                                color: "gold",
                              }}
                            />
                          </IconButton>
                          <img
                            src={image_url ? image_url : Image}
                            alt="Result"
                            style={{
                              objectFit: "contain",
                              height: "50%",
                              width: "50%",
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
                              color: "black",
                              fontWeight: "bold",
                              size: 40,
                              textTransform: "lowercase",
                              fontFamily: "sofia, sans-serif",
                            }}
                          >
                            Price: {currency_symbol} {main_price}
                            <br />
                            Discount: {discount_price}
                            <br />
                            Description : {description}
                            <br/>
                            updated: {update_at.split("T")[0]}
                            <br />
                            Created: {created_at.split("T")[0]}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>
                );
              }
            )}
          </Grid>
        ) : (
          <Typography>
            You will find the products for this store here{" "}
          </Typography>
        )}
        {openModal2 ? (
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(5px) brightness(0.5)",
              zIndex: 5,
              position: "fixed",
              top: 20,
              left: "20%",
              justifyContent: "space-between",
              width: "75vw",
              height: "90vh",
              overflow: "auto",
              opacity: 1.0,
              border: "1px solid #000",
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
            <EditConsole onClick={() => dispatch(toggleopenModal2())} />
          </div>
        ) : null}
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
        {Products.length > 1 && (
          <MyButtons text="Publish" onClick={() => onPublish(store.id)} />
        )}
        <Typography color="blue">{currentPage}</Typography>
      </Stack>
    </div>
  );
};

export default Console;
