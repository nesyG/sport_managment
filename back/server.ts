import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import path from "path";
import methodOverride from "method-override";
import loginRoutes from "./routes/login";
import adminRoutes from "./routes/admin";
import mockRoutes from "./routes/mock";
import mainRoutes from "./routes/main";
import session from "express-session";
const MongoStore = require("connect-mongo"); //PROMIJENI
import passport from "passport";
import middlewareFunctions from "./middleware/auth";
import swaggerDocs from "./swagger";

const app = express();

//Extend Request interface for user
declare module "express" {
  interface Request {
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

//Forms for put / delete
app.use(methodOverride("_method"));

//Static files
app.use(express.static("public"));

//Using EJS for views and setting root path (MAKNUTI?)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine(".html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join("../public")));

//Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat", //STAVITI U ENV VARIJABLU
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

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
  swaggerDocs(app, process.env.PORT)
});

//Routes for which the server is listening
app.use("/api", loginRoutes);
app.use("/mainPage", middlewareFunctions.verifyUser, mainRoutes);
app.use("/admin", middlewareFunctions.verifyAdmin, adminRoutes);
app.use("/mock", mockRoutes);
