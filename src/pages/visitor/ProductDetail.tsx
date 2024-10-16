import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createProductRating,
  getProductDetailById,
  getRandomProducts,
} from "../../api/ProductService";
import { loadingStore } from "../../store/isLoadingStore";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "../../components/carousel/EmblaCarousel";
import { Box, Chip, Grid, IconButton, Rating, Typography } from "@mui/material";
import { useProductCartStore } from "../../store/productCartStore";
import NormalButton from "../../components/button/NormalButton";
import {
  AddRounded,
  ArrowBackRounded,
  RemoveRounded,
  RemoveShoppingCart,
} from "@mui/icons-material";
import ProductCard from "../../components/cards/ProductCard";
import { userStore } from "../../store/userStore";
import { alertStore } from "../../store/alertStore";
import { SyntheticEvent } from "react";
import ContainerWrapper from "../../layouts/wrapper/ContainerWrapper";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setBarLoading } = loadingStore();

  const { logInUser } = userStore();

  const { products, setProduct } = useProductCartStore();

  const { setAlert } = alertStore();

  const { data, refetch } = useQuery({
    queryKey: ["get-product-details", id],
    queryFn: async () => {
      setBarLoading(true);
      const productDetails = await getProductDetailById(Number(id));
      setBarLoading(false);
      return productDetails;
    },
  });

  const { data: randomProducts } = useQuery({
    queryKey: ["get-random-products", id],
    queryFn: async () => {
      return await getRandomProducts(Number(id)).then((res) => res.data);
    },
  });

  const cartProduct = products.find((p: Product) => p.id === data?.id);
  const quantity = cartProduct ? cartProduct.qty : 0;

  const handleRemoveFromCart = () => {
    setProduct(
      products.filter((p: Product) => p.id !== data.id),
      new Date().getTime()
    );
  };

  const handleAddToCart = () => {
    if (logInUser) {
      setProduct(
        [
          ...products,
          {
            id: data.id,
            qty: 1,
            image: data.image_url,
            price: data.price,
            name: data.name,
          },
        ],
        new Date().getTime()
      );
    } else {
      navigate("/login");
      setAlert(true, "Plz, Log in First", "info");
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (values: Rating) =>
      await createProductRating(values).then(() => refetch()),
  });

  const handleIncreaseQty = () => {
    if (cartProduct) {
      setProduct(
        products.map((p: Product) =>
          p.id === data?.id ? { ...p, qty: p.qty + 1 } : p
        ),
        new Date().getTime()
      );
    }
  };

  const handleDecreaseQty = () => {
    if (cartProduct && cartProduct.qty > 1) {
      setProduct(
        products.map((p: Product) =>
          p.id === data?.id ? { ...p, qty: p.qty - 1 } : p
        ),
        new Date().getTime()
      );
    }
  };

  const handleRatingChange = async (
    _e: SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue) {
      try {
        await mutateAsync({ product_id: data?.id, rating: newValue });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ContainerWrapper>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackRounded />
      </IconButton>
      {data && (
        <>
          <Box className="flex md:space-x-10 flex-col md:flex-row">
            <Box className="w-full md:w-3/5">
              {data?.attachments && (
                <>
                  <EmblaCarousel slides={data?.attachments} options={OPTIONS} />
                </>
              )}
            </Box>
            <Box className="w-full md:w-2/5">
              <Typography variant="h4" component="h1" fontWeight="700">
                {data.name}
              </Typography>
              <Chip label={data.category_name} color="tertiary" size="small" />
              <Typography paragraph>{data.description}</Typography>
              <Box className="flex items-center space-x-2 my-3">
                <Rating name="read-only" value={data.average_rating} readOnly />{" "}
                <Typography
                  marginBottom={0}
                  paragraph
                >{`(${data.average_rating})`}</Typography>
              </Box>
              <Typography variant="h5" component="h1" fontWeight="700" mt={2}>
                ${data.price}
              </Typography>

              {cartProduct ? (
                <Box className="flex items-center space-x-3 my-4">
                  <NormalButton
                    text=""
                    icon={RemoveRounded}
                    type="contained"
                    onClick={handleDecreaseQty}
                    disable={quantity <= 1}
                  />
                  <Typography variant="h6" component="div">
                    {quantity}
                  </Typography>
                  <NormalButton
                    text=""
                    icon={AddRounded}
                    type="contained"
                    onClick={handleIncreaseQty}
                  />
                </Box>
              ) : (
                <NormalButton
                  text="Add To Cart"
                  type="contained"
                  onClick={handleAddToCart}
                  sx={{ my: 2 }}
                />
              )}

              {cartProduct && (
                <NormalButton
                  text="Remove"
                  type="contained"
                  icon={RemoveShoppingCart}
                  onClick={handleRemoveFromCart}
                />
              )}
            </Box>
          </Box>
          <Typography variant="h4" component="h2">
            Product Feedback
          </Typography>

          <Box>
            <Rating
              name="size-medium"
              defaultValue={data.average_rating}
              onChange={handleRatingChange}
            />
          </Box>
        </>
      )}

      <Grid container>
        {randomProducts?.data.map((product: ProductCard, i: number) => (
          <Grid item key={i} lg={3} md={4} sm={6} xs={12} p={1}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </ContainerWrapper>
  );
};

export default ProductDetail;
