import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogDetailById, getRandomBlogs } from "../../api/blogService";
import EmblaCarousel from "../../components/carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Grid, IconButton, Typography } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { loadingStore } from "../../store/isLoadingStore";
import BlogCard from "../../components/cards/BlogCard";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setBarLoading } = loadingStore();

  const { data = null } = useQuery<BlogFormValue>({
    queryKey: ["blog-list-user"],
    queryFn: async () => {
      setBarLoading(true);
      const response = await getBlogDetailById(Number(id));
      if (response.data.code === 200) {
        setBarLoading(false);
        return response.data.data;
      }
      setBarLoading(false);
      return [];
    },
  });

  const { data: randomBlogs = null } = useQuery<BlogFormValue[]>({
    queryKey: ["blog-list-random-user"],
    queryFn: async () =>
      await getRandomBlogs(Number(id)).then((response) => {
        if (response.data.code === 200) {
          return response.data.data;
        }
      }),
  });

  return (
    <>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackRounded />
      </IconButton>
      {data?.attachments && (
        <>
          <EmblaCarousel slides={data?.attachments} options={OPTIONS} />
          <Typography gutterBottom variant="h3" align="center" component="h1">
            {data.title}
          </Typography>
          <Typography variant="body2" component="p" marginBottom={2}>
            {data.description}
          </Typography>
        </>
      )}

      <Grid container>
        {randomBlogs?.map((blog, i) => (
          <Grid item key={i} lg={3} md={4} sm={6} xs={12} p={1}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BlogDetail;
