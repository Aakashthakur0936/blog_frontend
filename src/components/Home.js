import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import axios from "axios";
import { API_URl } from "../config/config";
import { Box, Button, Typography } from "@mui/material";
import AddBlog from "./AddBlog";

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [openAddBlog, setOpenAddBlog] = useState(false);
  const handleOpenAddBlog = () => setOpenAddBlog(true);
  const handleCloseAddBlog = () => setOpenAddBlog(false);
  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    axios
      .get(`${API_URl}/get/blog`)
      .then((data) => {
        if (data.status === 200) {
          setBlogData(data.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Box sx={{ padding: "2rem 4rem", textAlign: "end" }}>
        <Button variant="contained" onClick={() => handleOpenAddBlog()}>
          Add Blog
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent:'center' }}>
        {blogData.length > 0 ? blogData?.map((item, i) => (
          <Blogs item={item} />
        )):<><Box>
          <Typography component={'p'} sx={{fontWeight:600, fontSize:'3rem'}}>No Blog Found</Typography>
        </Box></>}
      </Box>
      <AddBlog
        openAddBlog={openAddBlog}
        handleCloseAddBlog={handleCloseAddBlog}
        getBlogs={getBlogs}
      />
    </>
  );
};

export default Home;
