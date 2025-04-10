const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const authRoutes = require("./Routes/authRoutes.js");
const machineRoutes = require("./Routes/machineRoutes.js");
const requestRoutes = require("./Routes/requestRoutes.js");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5001;

// Connection to database
const connection = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((err) => {
      console.log(`Error Not connected! ${err}`);
    });
};

//Routes for app
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/machines", upload.single("image"), machineRoutes);
app.use("/api/requests", requestRoutes);
// app.use("/messages", verifyToken, messageRoute);
// app.use("/queries", verifyToken, queryRoute);

//middleware for handling error
// app.use((err, req, res, next)=>{
//    const status=err.status || "500";
//    const message=err.message || "Something went wrong";
//    return res.status(status).json({
//     succcess:false,
//     status,
//     message
//    })
// })

// Connection to server on Port
app.listen(PORT, () => {
  connection();
  console.log(`Server started at PORT ${PORT}`);
});
