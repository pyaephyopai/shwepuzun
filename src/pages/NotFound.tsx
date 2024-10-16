import { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import notFoundAnimation from "../assets/animation/404.json";
import { Box } from "@mui/material";

const NotFound = () => {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#FFF5E1",
      }}
    >
      <Lottie
        loop={false}
        lottieRef={animationRef}
        animationData={notFoundAnimation}
        style={{
          height: "100%",
          display: "block",
        }}
        onComplete={() => {
          animationRef.current?.goToAndPlay(0, true);
        }}
      />
    </Box>
  );
};

export default NotFound;
