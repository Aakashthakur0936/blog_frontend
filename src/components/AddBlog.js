import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { API_URl } from "../config/config";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  "@media(max-width:900px)": {
    width: 300,
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
  outline: "none",
};

export default function AddBlog({ openAddBlog, handleCloseAddBlog, getBlogs }) {
  const validationSchema = yup.object({
    title: yup.string().trim().required("Please enter your title"),
    content: yup
      .string()
      .trim()
      .required("Please enter your content")
      .test(
        "wordCount",
        "Content should not exceed 100 words",
        (value) => value.split(/\s+/).length <= 100
      ),
      imgurl: yup
      .string()
      .trim()
      .required("Please enter your image URL")
      .matches(
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/,
        "Please enter a valid image URL"
      ),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      imgurl: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      axios
        .post(`${API_URl}/create/blog`, values)
        .then((response) => {
          // Handle success, log the response
          console.log("Response:", response);
          if (response.status === 201) {
            getBlogs()
            toast.success(response.data.message)
            handleCloseAddBlog()
            resetForm();
          }
        })
        .catch((error) => {
          // Handle error, log the error
          console.error("Error:", error);
        });
    },
  });
  return (
    <div>
      <Modal
        open={openAddBlog}
        onClose={handleCloseAddBlog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              component={"p"}
              sx={{ fontWeight: 600, fontSize: "1.3rem" }}
            >
              Add New Blog
            </Typography>
            <CloseIcon
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => handleCloseAddBlog()}
            />
          </Box>
          <Divider sx={{ marginTop: "1rem" }} />
          <Box sx={{ paddingTop: "1rem" }}>
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.8rem",
                }}
              >
                <Typography
                  component={"label"}
                  sx={{ padding: "0.5rem 0rem 0.5rem 0rem " }}
                >
                  Title
                </Typography>
                <TextField
                  id="title"
                  type="text"
                  value={formik.values.title}
                  placeholder="Enter your title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <Typography
                    component={"p"}
                    sx={{
                      color: "red",
                      paddingTop: "0.2rem",
                    }}
                  >
                    {formik.errors.title}
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.8rem",
                }}
              >
                <Typography
                  component={"label"}
                  sx={{ padding: "0rem 0rem 0.5rem 0rem " }}
                >
                  Content
                </Typography>
                <TextField
                  id="content"
                  type="text"
                  value={formik.values.content}
                  placeholder="Content should not exceed 100 words"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.content && formik.errors.content && (
                  <Typography
                    component={"p"}
                    sx={{
                      color: "red",
                      paddingTop: "0.2rem",
                    }}
                  >
                    {formik.errors.content}
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.8rem",
                }}
              >
                <Typography
                  component={"label"}
                  sx={{ padding: "0rem 0rem 0.5rem 0rem " }}
                >
                  Image Url
                </Typography>
                <TextField
                  id="imgurl"
                  type="text"
                  value={formik.values.imgurl}
                  placeholder="Enter your imgurl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.imgurl && formik.errors.imgurl && (
                  <Typography
                    component={"p"}
                    sx={{
                      color: "red",
                      paddingTop: "0.2rem",
                    }}
                  >
                    {formik.errors.imgurl}
                  </Typography>
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={!formik.isValid && !formik.dirty}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
