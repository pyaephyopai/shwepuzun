import {
  Box,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Paper,
  RadioGroup,
  Typography,
} from "@mui/material";

import { Radio } from "@mui/material";

import { useProductCartStore } from "../../store/productCartStore";
import NormalButton from "../../components/button/NormalButton";
import { Delete } from "@mui/icons-material";
import { useFormik } from "formik";
import { useEffect } from "react";
import FormInput from "../../components/form/FormInput";
import { userStore } from "../../store/userStore";
import { AddToCartOrderValidationSchema } from "../../validation/AddToCartOrderValidationSchema";
import { createOrder } from "../../api/OrderService";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../../api/userService";
import { alertStore } from "../../store/alertStore";
import ContainerWrapper from "../../layouts/wrapper/ContainerWrapper";

const AddToCart = () => {
  const { products, setProduct } = useProductCartStore();

  const { setAlert } = alertStore();

  const { userData, setUserData } = userStore();

  const navigate = useNavigate();

  const time = new Date().getTime();

  // Increase product quantity
  const handleIncreaseQty = (productId: number) => {
    setProduct(
      products.map((p: Product) =>
        p.id === productId ? { ...p, qty: p.qty + 1 } : p
      ),
      new Date().getTime()
    );
  };

  // Decrease product quantity
  const handleDecreaseQty = (productId: number) => {
    setProduct(
      products.map((p: Product) =>
        p.id === productId && p.qty > 0 ? { ...p, qty: p.qty - 1 } : p
      ),
      time
    );
  };

  const handleRemoveProduct = (productId: number) => {
    setProduct(
      products.filter((p: Product) => p.id !== productId),
      time
    );
  };

  // Calculate total price based on quantity
  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price * product.qty;
  }, 0);

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    setFieldValue,
    handleSubmit,
  } = useFormik<Order>({
    initialValues: {
      name: userData?.name,
      phone_number: userData?.phone,
      region: "",
      address: userData?.address ?? undefined,
      payment_type: undefined,
      total_price: undefined,
      notes: "",
      products: [],
    },
    validationSchema: AddToCartOrderValidationSchema,
    onSubmit: async (values) => {
      if (userData) {
        await updateUserData(userData?.id, values);

        await createOrder(values).then((response) => {
          if (response.data.code === 201) {
            navigate("/orders");
            setProduct([], time);
            setUserData({
              ...userData,
              region: values.region,
              address: values.address!,
            });
            setAlert(
              true,
              "Order Create SuccessFully and You can Cancel the order within 1hr",
              "success"
            );
          }
        });
      }
    },
  });

  useEffect(() => {
    if (products) {
      setFieldValue("products", products);
      setFieldValue("total_price", totalPrice);
    }
  }, [products, setFieldValue, totalPrice]);

  return (
    <ContainerWrapper>
      <Grid
        container
        sx={{
          py: 3,
          minHeight: "calc(100vh - 75px)",
        }}
      >
        <Grid item md={7} xs={12} pr={1} mb={2}>
          <Paper
            elevation={16}
            sx={{
              mb: 3,
              p: 2.5,

              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              mb={3}
              fontWeight={700}
            >
              Delivery Information
            </Typography>
            <Grid container>
              <Grid item xs={6} pr={1}>
                <FormInput
                  name="phone_number"
                  label="Phone"
                  required={true}
                  value={values.phone_number}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.phone_number}
                  touch={touched.phone_number}
                  sx={{
                    marginBottom: "15px",
                  }}
                />
                <FormInput
                  name="address"
                  label="Address"
                  required={true}
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.address}
                  touch={touched.address}
                  row={3}
                  sx={{
                    marginBottom: "15px",
                  }}
                />
              </Grid>
              <Grid item xs={6} pl={1}>
                <FormInput
                  name="region"
                  label="Region"
                  required={true}
                  value={values.region}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.region}
                  touch={touched.region}
                  sx={{
                    marginBottom: "15px",
                  }}
                />
                <FormInput
                  name="notes"
                  label="Notes"
                  value={values.notes}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.notes}
                  touch={touched.notes}
                  row={3}
                  sx={{
                    marginBottom: "15px",
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={16}
            sx={{
              p: 2.5,

              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              mb={3}
              fontWeight={700}
            >
              Payment Method
            </Typography>
            <Grid container>
              <Grid item md={12} pr={1}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{
                    ".MuiButtonBase-root.MuiRadio-root.Mui-checked": {
                      color: "#000",
                    },
                  }}
                >
                  <FormControlLabel
                    value={1}
                    checked={Number(values.payment_type) === 1}
                    control={<Radio size="small" />}
                    label="Cash on Delivery"
                    name="payment_type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControlLabel
                    checked={Number(values.payment_type) === 2}
                    value={2}
                    control={<Radio size="small" />}
                    label="POS on Delivery"
                    name="payment_type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControlLabel
                    value={3}
                    checked={Number(values.payment_type) === 3}
                    control={<Radio size="small" />}
                    label="Online Payment"
                    name="payment_type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </RadioGroup>
                {touched.payment_type && errors.payment_type ? (
                  <FormHelperText
                    sx={{
                      color: "#d32f2f",
                      marginLeft: "13px !important",
                    }}
                  >
                    {errors.payment_type}
                  </FormHelperText>
                ) : null}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item md={5} xs={12} pl={1}>
          <Paper
            elevation={16}
            sx={{
              p: 2.5,

              height: "100%",

              borderRadius: 2,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              textAlign="center"
              mb={3}
              fontWeight={700}
            >
              Order Summary
            </Typography>
            {products.length === 0 ? (
              <Typography
                variant="h6"
                component="h2"
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                No products in the cart
              </Typography>
            ) : (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection="column"
                  sx={{
                    height: "calc(100% - 70px)",
                  }}
                >
                  <Box>
                    {products.map((product: Product) => (
                      <Box key={product.id} mb={3}>
                        <Box display="flex" mb={2} gap={2}>
                          <Box
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{
                              width: "30%",
                              height: "30%",
                              borderRadius: 1,
                            }}
                          />
                          <Box>
                            <Typography
                              component="h2"
                              variant="h5"
                              fontWeight={700}
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              component="h2"
                              variant="h6"
                              fontWeight={700}
                            >
                              MMK {product.price}
                            </Typography>
                          </Box>
                        </Box>

                        <Box display="flex" alignItems="center" gap={2}>
                          <NormalButton
                            text="-"
                            type="contained"
                            onClick={() => handleDecreaseQty(product.id)}
                            disable={product.qty <= 0}
                          />
                          <Typography variant="h6" component="span">
                            {product.qty}
                          </Typography>
                          <NormalButton
                            text="+"
                            type="contained"
                            onClick={() => handleIncreaseQty(product.id)}
                          />
                          {product.qty === 0 && (
                            <IconButton
                              onClick={() => handleRemoveProduct(product.id)}
                              aria-label="remove product"
                            >
                              <Delete />
                            </IconButton>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Divider />
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="h6" component="h2">
                        Total Price
                      </Typography>
                      <Typography variant="h6" component="h2" fontWeight={700}>
                        MMK {totalPrice.toFixed(2)}
                      </Typography>
                    </Box>

                    {/* Confirm Button */}
                    <NormalButton
                      text="Confirm Purchase"
                      type="contained"
                      onClick={handleSubmit}
                    />
                  </Box>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default AddToCart;
