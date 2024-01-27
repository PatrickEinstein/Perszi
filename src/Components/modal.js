import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useMediaQuery } from "@material-ui/core";
import  MyButtons from "./Button"
import { useNavigate } from "react-router-dom";

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

const TransitionsModal = ({ title, body }) => {
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isNonMobileScreen ? 600 : 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
        <Fade in={open}>
          <Stack spacing={2} sx={style}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                width: isNonMobileScreen ? "auto" : "auto",
                paddingLeft: 3,
                paddingRight: 3,
              }}
            >
              <img
                src={""}
                style={{
                  height: 10,
                  // width: isNonMobileScreen ? 100 : 50,
                  objectFit: "contain",
                }}
              />
              <MyButtons
                text="Back"
                startIcon={<ArrowBackIosIcon />}
                onClick={() => {
                  navigate("/");
                }}
              />
            </Stack>
            {title}
            {body}
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
