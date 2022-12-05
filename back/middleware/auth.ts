const jwt = require("jsonwebtoken");
import User from "../models/users";

const middlewareFunctions = {
  verifyAdmin: async (req: any, res: any, next: any) => {
    const headers: string = req.headers["authorization"];
    const token: string = headers.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await User.findOne({ _id: decoded.id });

    if (findUser!.isAdmin != true) {
      return res.status(400).json("only admin has access to this page");
    } else {
      next();
    }
  },
  verifyUser: (req: any, res: any, next: any) => {
    const headers: string = req.headers["authorization"];
    const token: string = headers.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
};

export default middlewareFunctions;
