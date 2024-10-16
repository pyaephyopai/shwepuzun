import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }: { blog: BlogFormValue }) => {
  const navigate = useNavigate();

  const descriptionWords = blog.description.split(" ");

  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardActionArea onClick={() => navigate(`/blogs/${blog.id}`)}>
        <CardMedia
          component="img"
          image={blog.attachments?.[0].attachment_url}
          alt="green iguana"
          sx={{
            width: "100%",
            height: "200px",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descriptionWords.length > 50
              ? descriptionWords.slice(0, 30).join(" ") + "..."
              : blog.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
