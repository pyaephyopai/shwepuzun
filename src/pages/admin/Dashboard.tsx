import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
  keyframes,
} from "@mui/material";
import {
  Person,
  ShoppingCart,
  Inventory,
  ArrowUpward,
  ArrowDownward,
  LocalAtmRounded,
} from "@mui/icons-material";

import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboardData,
  getDashboardMonthlySale,
  getDashboardMonthlyUser,
} from "../../api/dashboardService";

type SalesData = {
  month: string;
  sales: number;
};

type UserData = {
  month: string;
  newUsers: number;
};

type ChartData = [string, number][];

const pulse = keyframes`
  0% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.05);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

// Helper style to add animation to skeleton
const animatedSkeletonStyle = {
  animation: `${pulse} 1.5s ease-in-out infinite`,
  borderRadius: "12px",
  backgroundImage:
    "linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%)",
  backgroundSize: "200% 100%",
};

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ["dashboards-data"],
    queryFn: async () =>
      await getDashboardData().then((response) => {
        if (response.data.code === 200) {
          return response.data.data;
        }
      }),
  });

  const { data: monthlySales } = useQuery<SalesData[]>({
    queryKey: ["monthly-sales"],
    queryFn: async () =>
      await getDashboardMonthlySale().then((response) => {
        if (response.data.code === 200) {
          return response.data.data;
        }
      }),
  });

  const { data: monthlyUsers, isLoading } = useQuery<UserData[]>({
    queryKey: ["monthly-users"],
    queryFn: async () =>
      await getDashboardMonthlyUser().then((response) => {
        if (response.data.code === 200) {
          return response.data.data;
        }
      }),
  });

  // Helpers for arrow indicators
  const renderGrowthIndicator = (growth: number) =>
    growth > 0 ? (
      <ArrowUpward style={{ color: "green" }} />
    ) : (
      <ArrowDownward style={{ color: "red" }} />
    );

  const formatChartData = (data: (SalesData | UserData)[]): ChartData => {
    return data.map(
      (item) =>
        [item.month, "sales" in item ? item.sales : item.newUsers] as [
          string,
          number
        ] // Assert tuple type
    );
  };

  // Conditionally format the data only if it exists
  const formattedSalesData: ChartData = monthlySales
    ? formatChartData(monthlySales)
    : [];
  const formattedUserData: ChartData = monthlyUsers
    ? formatChartData(monthlyUsers)
    : [];

  console.log(formattedSalesData);
  console.log(formattedUserData, "sss");

  const salesOptions = {
    title: "Monthly Sales Report",
    hAxis: {
      title: "Month",
    },
    vAxis: {
      title: "Sales ($)",
      minValue: 0,
    },
    chartArea: { width: "70%", height: "70%" },
    colors: ["#1E88E5"],
  };

  const userOptions = {
    title: "Monthly New Users Report",
    hAxis: {
      title: "Month",
    },
    vAxis: {
      title: "New Users",
      minValue: 0,
    },
    chartArea: { width: "70%", height: "70%" },
    colors: ["#43A047"],
  };

  return (
    <>
      <Grid container spacing={4} alignItems="stretch">
        {/* New Users & Total Users */}
        <Grid item xs={12} sm={6} md={3}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              sx={animatedSkeletonStyle}
            />
          ) : (
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">New Users </Typography>
                  {renderGrowthIndicator(data?.user_condition)}
                </Box>
                <Box display="flex" alignItems="center">
                  <Person fontSize="large" style={{ marginRight: "8px" }} />
                  <Typography variant="h4">{data?.new_users}</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Typography color="textSecondary">
                    Total Users: {data?.total_users}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Monthly Orders & Total Orders */}
        <Grid item xs={12} sm={6} md={3}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              sx={animatedSkeletonStyle}
            />
          ) : (
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">Orders</Typography>
                  {renderGrowthIndicator(data?.order_condition)}
                </Box>
                <Box display="flex" alignItems="center">
                  <ShoppingCart
                    fontSize="large"
                    style={{ marginRight: "8px" }}
                  />
                  <Typography variant="h4">{data?.new_orders}</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Typography color="textSecondary">
                    Total Orders: {data?.total_orders}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              sx={animatedSkeletonStyle}
            />
          ) : (
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">Sales Revenue </Typography>
                  {renderGrowthIndicator(data?.sale_condition)}
                </Box>
                <Box display="flex" alignItems="center">
                  <LocalAtmRounded
                    fontSize="large"
                    style={{ marginRight: "8px" }}
                  />
                  <Typography variant="h4">{data?.current_sales}</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Typography color="textSecondary">
                    Total Sales: ${data?.total_sales}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Total Products */}
        <Grid item xs={12} sm={6} md={3}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              sx={animatedSkeletonStyle}
            />
          ) : (
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">Total Products</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Inventory fontSize="large" style={{ marginRight: "8px" }} />
                  <Typography variant="h4">{data?.total_products}</Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      <Grid container mt={5}>
        <Grid item lg={6} md={12} xs={12} pr={1}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={animatedSkeletonStyle}
            />
          ) : (
            <Chart
              chartType="ColumnChart"
              className="flex-1"
              width="100%"
              height="400px"
              data={[["Month", "Sales"], ...formattedSalesData]}
              options={salesOptions}
            />
          )}
        </Grid>

        <Grid item lg={6} md={12} xs={12} pl={1}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={animatedSkeletonStyle}
            />
          ) : (
            <Chart
              chartType="ColumnChart"
              className="flex-1"
              width="100%"
              height="400px"
              data={[["Month", "New Users"], ...formattedUserData]}
              options={userOptions}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
