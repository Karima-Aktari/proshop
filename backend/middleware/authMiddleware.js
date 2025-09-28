import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../models/userModel.js";

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});
