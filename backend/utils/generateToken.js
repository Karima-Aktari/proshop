import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  //Creating Token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  //Set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 Days
  });
};

export default generateToken;
