import { Box, Grid, Stack, Typography } from "@mui/material";

import {
  AccessTimeFilledRounded,
  CalendarMonthRounded,
  Facebook,
  Instagram,
  YouTube,
  Twitter,
} from "@mui/icons-material";

import { logo } from "../utils/image";
import FooterLink from "../components/footer/FooterLink";
import ContainerWrapper from "./wrapper/ContainerWrapper";
import ContactInfo from "../components/footer/ContactInfo";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      sx={{
        paddingY: "2rem",
        height: "100%",

        color: "#fff",
        background: "#02040f",
      }}
    >
      <ContainerWrapper component="footer">
        <Grid container marginBottom="8px">
          <Grid item smd={4} sm={12} xs={12}>
            <Box display="flex" gap="5px" alignItems="center">
              <Box
                component="img"
                src={logo.logo6}
                alt="This is Logo Image"
                sx={{
                  height: "80px",

                  borderRadius: "100%",
                }}
              />
              <Stack>
                <Typography
                  variant="h3"
                  noWrap
                  component="h1"
                  sx={{
                    fontFamily: "Roboto Slab",
                    fontSize: "25px",
                    fontWeight: 700,
                  }}
                >
                  Shwe Pu Zun
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontSize: "14px" }}
                >
                  Cafeteria and Bakery House
                </Typography>
              </Stack>
            </Box>
            <Typography align="justify" paragraph>
            Shwe Pu Zun Bakery & Coffee House offers the finest baked goods and coffee, delivering quality and freshness in every order. Visit us in-store or shop online to enjoy our delicious treats. Stay updated with the latest news and promotions by following us on social media. 
            </Typography>
            <Box display="flex" gap={2} mt={2}>
              <Facebook
                sx={{ fontSize: 30, color: "#fff", cursor: "pointer" }}
                onClick={() =>
                  window.open("https://www.facebook.com", "_blank")
                }
              />
              <Instagram
                sx={{ fontSize: 30, color: "#fff", cursor: "pointer" }}
                onClick={() =>
                  window.open("https://www.instagram.com/shwepuzun_official_page?igsh=eG50djRjcjl2MHd1", "_blank")
                }
              />
              <YouTube
                sx={{ fontSize: 30, color: "#fff", cursor: "pointer" }}
                onClick={() => window.open("https://www.youtube.com", "_blank")}
              />
              <Twitter
                sx={{ fontSize: 30, color: "#fff", cursor: "pointer" }}
                onClick={() => window.open("https://www.twitter.com", "_blank")}
              />
            </Box>
          </Grid>
          <Grid item smd={4} sm={6} xs={12}>
            <Typography
              variant="h3"
              component="h1"
              align="center"
              sx={{
                marginBottom: "10px",

                fontFamily: "Roboto Slab",
                fontSize: "25px",
                fontWeight: 700,
              }}
            >
              Useful Links
            </Typography>
            <Stack alignItems="center" gap="8px">
              <FooterLink link="/" text="Home" />
              <FooterLink link="/products" text="Products" />
              <FooterLink link="/services" text="Services" />
              <FooterLink link="/shops" text="Shops" />
              <FooterLink link="/blogs" text="Blogs" />
            </Stack>
          </Grid>
          <Grid item smd={4} sm={6} xs={12}>
            <Typography
              variant="h3"
              component="h1"
              align="center"
              sx={{
                marginBottom: "10px",

                fontFamily: "Roboto Slab",
                fontSize: "25px",
                fontWeight: 700,
              }}
            >
              Opening Hours
            </Typography>

            <Box>
              <ContactInfo
                icon={<CalendarMonthRounded color="secondary" />}
                text="Mon - Sun"
              />
              <ContactInfo
                icon={<AccessTimeFilledRounded color="secondary" />}
                text="7:15 AM - 6:00 PM"
              />
              <ContactInfo
                icon={<CalendarMonthRounded color="secondary" />}
                text="09-123456789, 09-987654321"
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            padding: "10px",
            borderTop: "2px solid #999",
          }}
        >
          <Typography variant="body1" component="p" align="center">
            &copy; {year} All right reserved
          </Typography>
        </Box>
      </ContainerWrapper>
    </Box>
  );
};

export default Footer;
