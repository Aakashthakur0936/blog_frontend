/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URl } from "../config/config";
import Avatar from "@mui/material/Avatar";

const BlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getBlogById();
  }, [id]);
  const getBlogById = () => {
    axios
      .get(`${API_URl}/get/blog/by/${id}`)
      .then((data) => {
        if (data.status === 200) {
          setBlogData(data.data.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <Box>
        <Container>
          <Box
            sx={{
              margin: "9rem 5rem",
              "@media(max-width:900px)": {
                margin: "0rem",
              },
            }}
          >
            <Box sx={{ margin: "1rem 3rem", textAlign: "end" }}>
              <Button variant="contained" onClick={() => handleBack()}>
                Back
              </Button>
            </Box>
            <Card sx={{ maxWidth: 945 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    {blogData.title?.charAt(0)}
                  </Avatar>
                }
                title={blogData.title}
                sx={{ textTransform: "capitalize", fontWeight: "600" }}
                subheader={Date(blogData.updatedAt)}
              />
              <CardMedia
                sx={{ height: 540 }}
                image={blogData.imgurl}
                title="green iguana"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {blogData.content}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogPage;
