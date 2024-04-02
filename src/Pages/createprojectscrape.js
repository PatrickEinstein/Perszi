import React, { useCallback, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import { Stack, Switch, Typography } from "@mui/material";

import ProjectStartCard from "../Components/ProjectStartCard";

import MyButtons from "../Components/Button";
import { useDispatch } from "react-redux";
import BootLoader from "../Components/Bootloader";

import {
  GetAllUnscraped,
  StartScraping,
} from "../Components/RepositoryService/Requests";
import { Funnel } from "phosphor-react";

const FilterOpts = [
  {
    name: "created descending",
    value: "-created_at",
  },
  {
    name: "created ascending",
    value: "created_at",
  },
  {
    name: "Updated ascending",
    value: "updated_at",
  },
  {
    name: "Updated descending",
    value: "-updated_at",
  },
];

function CreateProjectScrape(props) {
  const dispatch = useDispatch();
  const [Store, setAllStores] = useState([]);
  const [searchParams, setSearchParameter] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  let [checkedList, setCheckedList] = useState([""]);
  let [ordering, setOrdering] = useState("-created_at");

  const onStartScrapeMany = useCallback(async () => {
    setOpen(true);
    for (const store_id  of checkedList) {
      console.log(store_id)
      await StartScraping(store_id);
    }
    setOpen(false);
    window.location.reload();
  }, [checkedList]);

  const onToggleMasterSwitch = () => {
    if (checkedList.length > 2) {
      setCheckedList([""]);
    } else {
      const newCheckedList = Store.map(({ store_id }) => store_id);
      setCheckedList(newCheckedList);
    }
  };

  // console.log(`checkedList==>`,checkedList)

  const handleChange = (store_id) => {
    if (checkedList.includes(store_id)) {
      if (!checkedList) {
        return [];
      }
      var newCheckedList = checkedList.filter((id) => id !== store_id);
      setCheckedList(newCheckedList);
    } else {
      setCheckedList([...checkedList, store_id]);
    }
  };

  const getAllStoresCallback = useCallback(async () => {
    setOpen(true);
    const response = await GetAllUnscraped(currentPage, searchParams, ordering);

    setAllStores(response.results);
    setPageCount(Math.ceil(response.count / 10));
    setOpen(false);
  }, [currentPage, searchParams, ordering]);

  useEffect(() => {
    getAllStoresCallback();
  }, [getAllStoresCallback, currentPage]);

  return (
    <Stack>
      <Stack justifyContent="center" alignItems="center">
       
          <Stack>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width:"70vw",
              }}
            >
              <Typography
                textAlign="center"
                sx={{
                  color: "brown",
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                Create Projects
              </Typography>
              <div
                style={{
                  marginLeft: "100px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Funnel color="black" />
                <select
                  style={{
                    backgroundColor: "gold",
                    width: "200px",
                    height: "50px",

                    borderRadius: "50px",
                    padding: "2px 5px",
                  }}
                  onChange={(e) => setOrdering(e.target.value)}
                >
                  {FilterOpts.map(({ name, value }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
        {/* </Stack> */}
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
        <Stack
          direction="row"
          justifyContent="space-between"
          marginBottom={5}
          marginTop={5}
        >
          <div>
            <Typography>Select All</Typography>
            <Switch
              // checked={checkedList.length > 2}
              checked={checkedList?.length === Store?.length}
              onChange={onToggleMasterSwitch}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <MyButtons
            text="Scrape All Selected"
            height={30}
            onClick={onStartScrapeMany}
          />
        </Stack>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            paddingLeft: 0,
            height: "auto",
          }}
        >
          {open ? (
            <BootLoader open={open} />
          ) : (
            Store?.map(
              (
                {
                  store_id,
                  id,
                  website_url,
                  name,
                  store_method,
                  image_url,
                  status,
                  category_url,
                  update_at,
                  created_at,
                },
                index
              ) => (
                <Grid item xs={12} sm={12} md={6} key={id}>
                  <ProjectStartCard
                    mode="CREATE"
                    store_id={store_id}
                    category_url={category_url}
                    id={store_id}
                    website_url={website_url}
                    name={name}
                    store_method={store_method}
                    label="Start project Scrape"
                    index={index}
                    handleChange={() => handleChange(store_id)}
                    checkedList={checkedList}
                    update_at={update_at}
                    created_at={created_at}
                    // setIsChecked={setIsChecked}
                  />
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
        mt="2rem"
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

export default CreateProjectScrape;
