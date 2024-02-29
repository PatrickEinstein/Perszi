import { Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DialogueModal from "./DialogueModal";
import BootLoader from "./Bootloader";
import MyButtons from "./Button";
import {
  CreateAdmin,
  DeleteAdmin,
  FindAllAdmin,
} from "./RepositoryService/Requests";

const Administrator = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [mode, setMode] = React.useState("");
  const [showTip, setShowTip] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [openLoader, setOpenLoader] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [buttonIdentity, setButtonIdentity] = useState({
    api: "scroles/all",
    button: "admin",
  });

  const [Page, setPage] = useState(1);

  const onPrevious = () => {
    if (Page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const OnNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const HandleChange = useCallback(
    async (id, iduse) => {
      const whichIdToUse = mode === "create" ? iduse : id;
      try {
        const response =
          mode === "create"
            ? CreateAdmin(mode, whichIdToUse)
            : DeleteAdmin(mode, whichIdToUse);
        const updatedUser = await response;
        alert(updatedUser.message);
        setOpenLoader(false);
      } catch (err) {
        alert("AN Error occurred, please try again soon");
        setOpenLoader(false);
      }
    },
    [mode]
  );

  const handleTogglePassword = (currentAdmin) => {
    setCurrentAdmin(currentAdmin);
    setShowTip((prevShowTip) => !prevShowTip);
  };

  const AdminsFound = useCallback(async () => {
    const allAdmins = await FindAllAdmin(buttonIdentity);
    setAllUsers(allAdmins);
  }, [buttonIdentity]);

  useEffect(() => {
    setOpenLoader(true);
    AdminsFound();
    setOpenLoader(false);
  }, [Page, AdminsFound, buttonIdentity]);

  return (
    <Stack
      justifyContent="space-between"
      height="95vh"
      s={{
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
        scrollbarGutter: "unset",
      }}
    >
      <Stack direction="row" justifyContent="space-around" mb="2rem">
        <Button
          variant="contained"
          textalign="center"
          onClick={() =>
            setButtonIdentity({
              api: "tbuser-list",
              button: "Staffs",
            })
          }
          sx={{
            color: "white",
            fontSize: 40,
            cursor: "pointer",
            backgroundColor:
              buttonIdentity.button === "Staffs" ? "yellow" : "blue",
            borderBottom:
              buttonIdentity.button === "Staffs" ? "5px red solid" : "blue",
            width: "40%",
          }}
        >
          ALL
        </Button>
        <Button
          variant="contained"
          textalign="center"
          onClick={() =>
            setButtonIdentity({
              api: "scroles/all",
              button: "admin",
            })
          }
          sx={{
            color: "white",
            fontSize: 40,
            cursor: "pointer",
            backgroundColor:
              buttonIdentity.button === "admin" ? "yellow" : "blue",
            borderBottom:
              buttonIdentity.button === "Staffs" ? "5px red solid" : "blue",

            width: "40%",
          }}
        >
          Active
        </Button>
      </Stack>

      <Stack
        sx={{
          height: "70vh",
          overflow: "auto",
          width: "auto",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Usage Identity</th>
              <th>Destroy || Create</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {openLoader ? (
              <BootLoader open={openLoader} />
            ) : (
              allUsers.length > 0 &&
              allUsers?.map(
                ({ user_type, iduse, id, email, username }, index) => (
                  <>
                    <tr key={index}>
                      <td>{id}</td>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{user_type}</td>
                      <td>{iduse}</td>
                      <td>
                        <MyButtons
                          text={
                            buttonIdentity.button === "Staffs"
                              ? "Create Admin"
                              : "Destroy Admin"
                          }
                          onClick={() => {
                            buttonIdentity.button === "Staffs"
                              ? setMode("create")
                              : setMode("delete");
                            HandleChange(id, iduse);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </td>
                      <td>
                        {buttonIdentity.api === "scroles/all" && (
                          <IconButton
                            onClick={() => {
                              handleTogglePassword(iduse);
                              setSelectedUser({
                                email: email,
                                user_type: user_type,
                                id: id,
                                iduse: iduse,
                                username: username,
                              });
                            }}
                          >
                            <VisibilityOffIcon />
                          </IconButton>
                        )}
                      </td>
                    </tr>
                    {showTip && currentAdmin === iduse && (
                      <tr>
                        <td colSpan="6">
                          <DialogueModal
                            onClose={handleTogglePassword}
                            user_type={selectedUser.user_type}
                            iduse={selectedUser.iduse}
                            email={selectedUser.email}
                            username={selectedUser.username}
                            id={selectedUser.id}
                          />
                        </td>
                      </tr>
                    )}
                  </>
                )
              )
            )}
          </tbody>
        </table>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: "100%",
          p: "1rem 5rem",
        }}
      >
        <Button variant="contained" onClick={onPrevious}>
          Previous
        </Button>
        <Typography>{Page}</Typography>
        <Button variant="contained" onClick={OnNextPage}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default Administrator;
