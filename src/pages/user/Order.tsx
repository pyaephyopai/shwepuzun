import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Paper,
  Button,
  Modal,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { changeOrderStatus, getOrderByUserId } from "../../api/OrderService";
import { Cancel, CheckCircle, Error, Pending } from "@mui/icons-material";

import dayjs from "dayjs";
import { alertStore } from "../../store/alertStore";
import { useState } from "react";
import CancelButton from "../../components/button/CancelButton";
import NormalButton from "../../components/button/NormalButton";
import ContainerWrapper from "../../layouts/wrapper/ContainerWrapper";

const Order = () => {
  const { setAlert } = alertStore();

  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | undefined>(
    undefined
  );

  const { data, refetch } = useQuery({
    queryKey: ["order-list"],
    queryFn: async () =>
      await getOrderByUserId().then((response) => response.data.data),
  });

  const canCancelOrder = (orderDate: string) => {
    const now = dayjs();
    const orderTime = dayjs(orderDate);
    const diffInHours = now.diff(orderTime, "hour");
    return diffInHours < 1; // Returns true if the order is within 1 hour
  };

  // Function to handle order cancellation
  const handleCancelOrder = async (orderId: number) => {
    changeOrderStatus(orderId, { status: 4 }).then((response) => {
      if (response.data.code === 201) {
        setAlert(true, "Order Cancel SuccessFully", "success");
        refetch();
        setSelectedOrderId(undefined);
        setOpen(false);
      }
    });
  };

  const handleCancel = async () => {
    handleCancelOrder(selectedOrderId!);
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 1: // Pending
        return <Pending color="warning" />;
      case 2: // Success
        return <CheckCircle color="success" />;
      case 3: // Canceled
        return <Error color="error" />;
      case 4: // Denied
        return <Cancel color="error" />;
      default:
        return null;
    }
  };

  const modalBoxStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "fit-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
  };

  return (
    <ContainerWrapper>
      <Paper sx={{ p: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          fontFamily="Roboto Slab"
          fontWeight={700}
        >
          Order List
        </Typography>
        {data?.map((order: OrderHistory) => {
          const orderCancelable = canCancelOrder(order.order_date);
          return (
            <Card key={order.id} sx={{ marginBottom: 4, padding: 2 }}>
              <CardContent>
                {/* Order Header */}
                <Typography variant="h5" component="div" gutterBottom>
                  Order Code: {order.order_code}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  {getStatusIcon(order.status)}
                  <Typography variant="subtitle1" color="text.secondary">
                    Status:{" "}
                    {(() => {
                      switch (order.status) {
                        case 1:
                          return "Pending";
                        case 2:
                          return "Success";
                        case 3:
                          return "Denied";
                        case 4:
                          return "Canceled";
                        default:
                          return "Unknown";
                      }
                    })()}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                  User: {order.user_name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment Type: {order.payment_type}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Price: ${order.total_price}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Date:{" "}
                  {dayjs(order.order_date).format("YYYY-MM-DD HH:mm:ss")}
                </Typography>

                {/* Cancel Order Button */}
                {order.status === 1 && orderCancelable ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => (
                      setOpen(true), setSelectedOrderId(order.id)
                    )}
                    sx={{ mt: 2 }}
                  >
                    Cancel Order
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    disabled
                    sx={{ mt: 2 }}
                  >
                    Cancel Order (Unavailable)
                  </Button>
                )}

                {/* Divider */}
                <Divider sx={{ my: 2 }} />

                {/* Order Details */}
                <Typography variant="h6" component="div">
                  Order Details:
                </Typography>

                <Grid container spacing={2}>
                  {order.order_details.map((detail) => (
                    <Grid item xs={12} md={6} lg={4} key={detail.product_id}>
                      <Card sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component="img"
                          sx={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            marginRight: 2,
                          }}
                          src={detail.product_image_url}
                          alt={detail.product_name}
                        />
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography variant="subtitle1">
                            {detail.product_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {detail.qty}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Price: ${detail.price}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total: ${detail.total}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </Paper>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontSize={30}
            fontWeight={700}
          >
            Cancel
          </Typography>
          <Typography id="modal-modal-description">
            Are you sure you want to cancel this order
          </Typography>
          <Stack mt={3.25} gap={2} flexDirection={"row"} justifyContent={"end"}>
            <CancelButton
              type="contained"
              onClick={() => (setOpen(false), setSelectedOrderId(undefined))}
            />
            <NormalButton
              type="contained"
              text="Confirm"
              onClick={handleCancel}
            />
          </Stack>
        </Box>
      </Modal>
    </ContainerWrapper>
  );
};

export default Order;
