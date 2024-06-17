import React, { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";

import MyButtons from "./Button";

import { useCallback } from "react";
import {
  GetAdminDetailsRoleDetails,
  OnUpdateCreateUserRole,
} from "./RepositoryService/Requests";


export default function DialogueModal({
  open,
  onClose,
  user_type,
  iduse,
  username,
  id,
}) {
  var [notifications, setNotifications] = useState("");
  const [roles, setRoles] = React.useState([
    { roleValue: "X", label: "Create New Project" },
    { roleValue: "X", label: "Ongoing Projects" },
    { roleValue: "X", label: "Project Result" },
    {
      roleValue: "X",
      label: "New Project, Ongoing Projects, Project Results",
    },
  ]);

  const GetAdminDetails = useCallback(async () => {
    try {
      const response = await GetAdminDetailsRoleDetails(id);
      const UserDetails = await response.json();
      const updatedRoles = UserDetails.roles.map((obj, index) => ({
        roleValue: obj,
        label: roles[index].label,
      }));

      setRoles(updatedRoles);
    } catch (err) {
      setNotifications(err.message, err);
    }
  }, [id]);

  useEffect(() => {
    GetAdminDetails();
  }, [id, GetAdminDetails]);

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

  const OnUpdateCreateUser = useCallback(async () => {
    let RoleSelected = [];
    RoleSelected[0] = roles[0].roleValue
    RoleSelected[1] = roles[1].roleValue;
    RoleSelected[2] = roles[2].roleValue;
    RoleSelected[3] = roles[3].roleValue;
    try {
      const response = OnUpdateCreateUserRole(
        user_type,
        RoleSelected,
        iduse,
        id
      );
      const updatedUser = await response.json();
      setNotifications(updatedUser.message);
    } catch (err) {
      setNotifications(err.message);
    }
  }, [roles]);

  return (
    <div
      style={{
        zIndex: 2,
        backgroundColor: "rgb(0, 0, 128)",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "40vh",
        overflowY: "scroll",
        // borderRadius: "25px",
        color: "white",
        border: "3px solid skyblue",
        textAlign: "left",
        padding: "10px",
        scrollbarWidth: "none",
        scrollbarColor: "skyblue rgb(0, 0, 128)",
        lineHeight: "20px",
      }}
    >
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
              text={roles[index].roleValue !== "X" ? "Enabled" : "Disabled"}
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
    </div>
  );
}
