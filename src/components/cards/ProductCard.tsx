import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

import { RemoveShoppingCart } from "@mui/icons-material";

import "./ProductCard.css";
import NormalButton from "../button/NormalButton";
import { useProductCartStore } from "../../store/productCartStore";
import { userStore } from "../../store/userStore";
import { alertStore } from "../../store/alertStore";
import { red } from "@mui/material/colors";

const ProductCard = ({ product }: { product: ProductCard }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { products, setProduct } = useProductCartStore();

  const { logInUser } = userStore();

  const { setAlert } = alertStore();

  const isProductInCart = products.some((p: Product) => p.id === product.id);

  const handleAddToCart = () => {
    if (logInUser) {
      const cardElement = cardRef.current;
      if (cardElement) {
        const clonedCard = cardElement.cloneNode(true) as HTMLElement;
        document.body.appendChild(clonedCard);

        const rect = cardElement.getBoundingClientRect();
        clonedCard.style.position = "fixed";
        clonedCard.style.left = `${rect.left}px`;
        clonedCard.style.top = `${rect.top}px`;
        clonedCard.style.width = `${rect.width}px`;
        clonedCard.style.height = `${rect.height}px`;
        clonedCard.style.zIndex = "1000";
        clonedCard.style.transition =
          "transform 0.75s ease-in-out, opacity 0.75s ease-in-out";

        const cartRect = document
          .querySelector("#cart-icon")!
          .getBoundingClientRect();
        clonedCard.style.transform = `translate(${
          cartRect.left - rect.left - 130
        }px, ${cartRect.top - rect.top - 200}px) scale(0.2)`;
        clonedCard.style.opacity = "0";

        setTimeout(() => {
          clonedCard.remove();
          setProduct(
            [
              ...products,
              {
                id: product.id,
                qty: 1,
                image: product.image_url,
                price: product.price!,
                name: product.name,
              },
            ],
            new Date().getTime()
          );
        }, 750);
      }
    } else {
      navigate("/login");
      setAlert(true, "Plz, Log in First", "info");
    }
  };

  const handleRemoveFromCart = () => {
    setProduct(
      products.filter((p: Product) => p.id !== product.id),
      new Date().getTime()
    );
  };

  return (
    <Card ref={cardRef} sx={{ height: "100%" ,}}>
      <CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          sx={{
            width: "100%",
            height: "250px",
          }}
          image={product.image_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1">
            {product.name}
          </Typography>
          <Rating name="read-only" value={product.average_rating} readOnly />
          <Typography component="h3" fontWeight={700} fontSize={25}>
            MMK {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isProductInCart ? (
          <NormalButton
            text="Remove"
            type="contained"
            icon={RemoveShoppingCart}
            onClick={handleRemoveFromCart}
          />
        ) : (
          <NormalButton
            text="Add To Cart"
            type="contained"
            onClick={handleAddToCart}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
