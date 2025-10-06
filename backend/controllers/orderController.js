import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import { calcPrices } from "../utils/calcPrices.js";

// //@description Create new order
// //@route       POST /api/orders
// //access       Private
// const addOrderItems = asyncHandler(async (req, res) => {
//   const {
//     orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   } = req.body;

//   if (orderItems && orderItems.length === 0) {
//     res.status(400);
//     throw new Error("No order items");
//   } else {
//     console.log(req.user);
//     const order = new Order({
//       orderItems: orderItems.map((x) => ({
//         ...x,
//         product: x_id,
//         _id: undefined,
//       })),
//       // user: req.user._id,
//       user: "68e34ff23052c1d14b72d0d9",
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//     });

//     const createOrder = await order.save();
//     res.status(201).json(createOrder);
//   }
// });

//My code for testing
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: [
        {
          _id: {
            $oid: "68ce21f75e8c55d2295a0542",
          },
          user: {
            $oid: "68ce21f75e8c55d2295a053e",
          },
          name: "Airpods Wireless Bluetooth Headphones",
          image: "/images/airpods.jpg",
          brand: "Apple",
          category: "Electronics",
          description:
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
          rating: 4.5,
          numReviews: 12,
          price: 89.99,
          countInStock: 10,
          reviews: [],
          __v: 0,
          createdAt: {
            $date: "2025-09-20T03:39:35.096Z",
          },
          updatedAt: {
            $date: "2025-09-20T03:39:35.096Z",
          },
        },
      ],
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@description Get logged in user orders
//@route       GET /api/orders/myorders
//access       Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@description Get order by ID
//@route       GET /api/orders/:id
//access       Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findByID(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new "Order not found"();
  }
});

//@description Update order to paid
//@route       GET /api/orders/:id/pay
//access       Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

//@description Update order to delivered
//@route       GET /api/orders/:id/delivered
//access       Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

//@description Get all orders
//@route       GET /api/orders
//access       Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
