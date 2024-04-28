import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function Blogs({item}) {
  const navigate = useNavigate()
  
  const handleReadMore = (val) =>{
    navigate(`/blog/${val}`)
  }
  return (
    <>
      <Box sx={{margin:"2rem"}}>
        <Container>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {item.title.charAt(0)}
                </Avatar>
              }
              title={item.title}
              sx={{textTransform:'capitalize', fontWeight:'600'}}
              subheader={Date(item.updatedAt)}
            />
            <CardMedia
              component="img"
              height="250"
              image={item.imgurl}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
              {item.content?.slice(0, 200)}
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{display:'flex', justifyContent:'space-between', padding:'0.8rem 1rem'}}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>

                <Button variant="contained" onClick={()=>handleReadMore(item._id)} >Read more</Button>

            </CardActions>
          </Card>
        </Container>
      </Box>
    </>
  );
}
