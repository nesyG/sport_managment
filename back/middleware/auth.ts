const jwt = require("jsonwebtoken");
import User from "../models/users";

const middlewareFunctions = {
  verifyAdmin: async (req: any, res: any, next: any) => {
    const authorization: string = req.headers["authorization"];
    if (!authorization) return res.status(401).json({message: "Unathorized access attempted"});
    const token: string = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await User.findOne({ _id: decoded.id });

    if (findUser!.isAdmin != true) {
      return res.status(403).json("Only admin has access to this page");
    } else {
      next();
    }
  },
  verifyUser: (req: any, res: any, next: any) => {
    const authorization: string = req.headers["authorization"];
    if (!authorization) return res.status(401).json({message: "Only registered and verified users have access to this page"});
    const token: string = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: any) => {
      if (err) return res.status(403).json({message: "Bad token"});
      req.user = user;
      next();
    });
  },
};

export default middlewareFunctions;
