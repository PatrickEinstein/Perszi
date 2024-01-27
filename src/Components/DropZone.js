import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  useMediaQuery,
  Stack,
  IconButton,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Upload } from "phosphor-react";

const UploadWidget = ({ image, setImage, job }) => {
  console.log(`image`, image);
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(true);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Stack
      spacing={3}
      sx={{
        width: 200,
      }}
    >
      {isImage && (
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <Stack>
              <Box
                {...getRootProps()}
                border={"2px dashed blue"}
                p="1rem"
                width="80%"
                sx={{
                  "&:hover": { cursor: "pointer" },
                  height: "auto",
                  position: "relative",
                }}
              >
                <input {...getInputProps()} />
                {image ? (
                  <Stack>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "20%",
                        left: "30% ",
                        fontSize: 60,
                      }}
                    >
                      <Camera />
                    </IconButton>
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt="Image"
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </Stack>
                ) : (
                  <Stack>
                    <Upload />
                    <Typography>Upload an Image</Typography>
                  </Stack>
                )}
              </Box>
            </Stack>
          )}
        </Dropzone>
        // </Box>
      )}
    </Stack>
  );
};

export default UploadWidget;
