import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../api/OrderService";
import AdminFormWrapper from "../../../layouts/admin/AdminFormWrapper";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import FormInput from "../../../components/form/FormInput";

const OrderDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["order-detail", id],
    queryFn: async () =>
      await getOrderById(Number(id)).then((response) => {
        if (response.data.code === 200) return response.data.data;
      }),
  });

  return (
    <AdminFormWrapper title="Order Detail">
      {isLoading ? (
        <CircularProgress
          color="secondary"
          sx={{
            marginX: "auto",
          }}
        />
      ) : (
        <>
          <Grid item xs={6} pr={2}>
            <FormInput
              name="order_code"
              label="Order Code"
              disabled={true}
              value={data?.order_code ?? ""}
              sx={{
                marginBottom: "15px",
              }}
            />
            <FormInput
              name="total_price"
              label="Total Price"
              disabled={true}
              value={data?.total_price ?? ""}
              sx={{
                marginBottom: "15px",
              }}
            />
          </Grid>
          <Grid item xs={6} pl={2}>
            <FormInput
              name="customer_name"
              label="Customer Name"
              disabled={true}
              value={data?.user_name ?? ""}
              sx={{
                marginBottom: "15px",
              }}
            />
            <FormInput
              name="payment_type"
              label="Payment Type"
              disabled={true}
              value={data?.payment_type ?? ""}
              sx={{
                marginBottom: "15px",
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              name="notes"
              label="Notes"
              disabled={true}
              value={data?.notes ?? ""}
              row={3}
              sx={{
                marginBottom: "15px",
              }}
            />
          </Grid>

          <Box
            sx={{
              width: "100%",

              mt: 2,
            }}
            display="block"
          >
            <Typography variant="h5" component="h2" mb={3} fontWeight={700}>
              Products
            </Typography>

            <Box>
              {data?.order_details &&
                data?.order_details.map(
                  (productDetail: OrderDetail, i: number) => (
                    <Box key={i} display="flex" mb={2} gap={2}>
                      <Box
                        component="img"
                        alt="This is image"
                        sx={{
                          width: "120px",
                          height: "120px",

                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        src={productDetail.product_image_url}
                      />
                      <Box
                        display="block"
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="h6"
                          fontWeight={500}
                        >
                          {productDetail.product_name}
                        </Typography>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          pr={3}
                        >
                          <Typography paragraph fontWeight={500}>
                            MMK {productDetail.price} {"*"} {productDetail.qty}
                          </Typography>

                          <Typography
                            variant="h5"
                            component="h5"
                            fontWeight={600}
                          >
                            MMK {productDetail.total}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )
                )}
            </Box>
          </Box>
        </>
      )}
    </AdminFormWrapper>
  );
};

export default OrderDetails;
