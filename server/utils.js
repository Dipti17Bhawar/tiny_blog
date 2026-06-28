import jwt from "jsonwebtoken";

const getCurrentUser = (req) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Token missing");
  }

  const token = authorization.split(" ")[1];

  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  return decodedToken;
};

export default getCurrentUser;