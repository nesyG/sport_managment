import express from "express";
import { connect } from "mongoose";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import mockRoutes from "./routes/mock";
import sportsRoutes from "./routes/sports";
import passport from "passport";
import middlewareFunctions from "./middleware/auth";
import swaggerDocs from "./swagger";
import classesRoutes from "./routes/classes";
import cors from "cors"

const app = express();
app.use(cors({
  origin: "http://localhost:9000",
  credentials: true
}))

//Extend Request interface for user
declare module "express" {
  export interface Request {
    user?: any;
  }
}

//Use .env file in config folder

require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Body Parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get('/*', function(req, res) { // <-- add
//   res.sendFile(path.join(__dirname, './front/dist/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

// Passport middleware
app.use(passport.initialize());
require("./middleware/jwt")(passport);

//Connect To Database
const dbConnectionString: string = process.env.DB_STRING || "";
async function connectDB(): Promise<void> {
  try {
    await connect(dbConnectionString);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
connectDB();

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
  swaggerDocs(app, process.env.PORT);
});

//Routes for which the server is listening
app.use("/", authRoutes);
app.use("/sports", sportsRoutes);
app.use("/classes", classesRoutes);
app.use("/users", middlewareFunctions.verifyAdmin, usersRoutes);
app.use("/mock", mockRoutes); //Used only locally for quick db population and clearing, when needed
