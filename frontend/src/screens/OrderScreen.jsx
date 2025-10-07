// import { Link, useParams } from "react-router-dom";
// import {
//   Row,
//   Col,
//   ListGroupe,
//   Image,
//   Form,
//   Button,
//   Card,
// } from "react-bootstrap";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import { useGetOrderDetailsQurey } from "../slices/ordersApiSlice";

// function OrderScreen() {
//   const { id: orderId } = useParams();
//   const {
//     data: order,
//     refetch,
//     isLoading,
//     error,
//   } = useGetOrderDetailsQurey(orderId);
//   console.log(order);

//   return isLoading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger" />
//   ) : (
//     <>
//       <h1>Order {order._id}</h1>
//     </>
//   );
// }

// export default OrderScreen;
