import { useQuery } from "@tanstack/react-query";
import { getAllBlogUser } from "../../api/blogService";
import { Grid, Typography } from "@mui/material";
import { loadingStore } from "../../store/isLoadingStore";
import BlogCard from "../../components/cards/BlogCard";
import ContainerWrapper from "../../layouts/wrapper/ContainerWrapper";

const Blog = () => {
  const { setBarLoading } = loadingStore();

  const { data = [] } = useQuery<BlogFormValue[]>({
    queryKey: ["blog-list-user"],
    queryFn: async () => {
      setBarLoading(true);
      const response = await getAllBlogUser();
      if (response.data.code === 200) {
        setBarLoading(false);
        return response.data.data;
      }
      setBarLoading(false);
      return [];
    },
  });

  return (
    <ContainerWrapper>
      <Grid container>
        {data.length > 0 ? (
          data.map((blog: BlogFormValue, i) => {
            return (
              <Grid item key={i} lg={3} md={4} sm={6} xs={12} p={1}>
                <BlogCard blog={blog} />
              </Grid>
            );
          })
        ) : (
          <Typography variant="h6" component="h4">
            No Blogs
          </Typography>
        )}
      </Grid>
    </ContainerWrapper>
  );
};

export default Blog;
