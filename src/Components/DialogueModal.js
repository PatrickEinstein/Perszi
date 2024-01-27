import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Stack, Typography } from "@mui/material";

import MyButtons from "./Button";
import ToastNotification from "./Toast";
import { useCallback } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogueModal({
  open,
  onClose,
  user_type,
  iduse,
  username,
  id,
}) {
  const [roles, setRoles] = React.useState([
    { roleValue: "X", label: "Create New Project" },
    { roleValue: "X", label: "Ongoing Projects" },
    { roleValue: "X", label: "Project Result" },
    {
      roleValue: "X",
      label: "New Project, Ongoing Projects, Project Results",
    },
  ]);
  var [notifications, setNotifications] = useState("");
  useEffect(() => {
    const GetAdminDetails = async () => {
      try {
        const response = await fetch(
          `http://13.60.18.223/user/scroles/detail/${id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const UserDetails = await response.json();
        UserDetails.roles.forEach(
          (obj, index) => (roles[index].roleValue = obj)
        );
      } catch (err) {
        setNotifications(err.message, err);
      }
    };

    GetAdminDetails();
  }, [id]);

  const handleChange = (index, value) => {
    const updatedRoles = [...roles];

    if (index === 0) {
      updatedRoles[index].roleValue = value ? "N" : "X";
    } else if (index === 1) {
      updatedRoles[index].roleValue = value ? "C" : "X";
    } else if (index === 2) {
      updatedRoles[index].roleValue = value ? "D" : "X";
    } else if (index === roles.length - 1) {
      updatedRoles[index].roleValue = value ? "A" : "X";
    }

    setRoles(updatedRoles);
  };

  const RoleSelected = [];

  roles.forEach((role) => RoleSelected?.push(role.roleValue));

  const OnUpdateCreateUser = useCallback(async () => {
    try {
      const response = await fetch(
        `http://13.60.18.223/user/scroles/update/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_type: user_type,
            roles: RoleSelected,
            iduse: iduse,
          }),
        }
      );
      const updatedUser = await response.json();
      setNotifications(updatedUser.message);
    } catch (err) {
      setNotifications(err.message);
    }
  },[]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Manage Administrator"}</DialogTitle>
        <DialogContent>
          <ToastNotification notification={notifications} />
          <DialogContentText id="alert-dialog-slide-description">
            <Stack direction="row" justifyContent="space-between" mb="3rem">
              <Typography fontWeight="bold">
                {username} {user_type} {iduse}{" "}
              </Typography>
            </Stack>
            <Stack spacing={3}>
              {roles.map((role, index) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  key={`roles-${index}`}
                >
                  <Typography>{role.label}</Typography>
                  <MyButtons
                    text={
                      roles[index].roleValue !== "X" ? "Enabled" : "Disabled"
                    }
                    onClick={() =>
                      handleChange(index, roles[index].roleValue === "X")
                    }
                  />
                </Stack>
              ))}
            </Stack>
            <MyButtons
              text="Update Roles"
              onClick={() => {
                OnUpdateCreateUser();
                onClose();
              }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
