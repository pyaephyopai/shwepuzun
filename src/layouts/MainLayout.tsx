import { Outlet } from "react-router-dom";

import { KeyboardArrowUp } from "@mui/icons-material";

import {
  Box,
  Fab,
  Fade,
  LinearProgress,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";

import Navbar from "./Navbar";
import Footer from "./Footer";

import "@fontsource/roboto";
import "@fontsource/roboto-slab";

import { loadingStore } from "../store/isLoadingStore";
import { useEffect } from "react";
import { useProductCartStore } from "../store/productCartStore";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const MainLayout = () => {
  const { barLoading } = loadingStore();
  const { products, clearProduct } = useProductCartStore();

  const product = localStorage.getItem("product");
  const parsed = JSON.parse(product!);
  const now = new Date().getTime();

  useEffect(() => {
    if (products.length > 0 && now - parsed?.state?.timestamp > 86_400_000) {
      clearProduct();
    }
  }, [product, parsed, products.length, now, clearProduct]);

  return (
    <>
      <Navbar />
      <Toolbar id="back-to-top-anchor" />
      <Box sx={{ width: "100%" }}>
        {barLoading && <LinearProgress color="secondary" />}
      </Box>
      <Outlet />
      <Footer />
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
      {/* <ReactQueryDevtools /> */}
    </>
  );
};

export default MainLayout;
