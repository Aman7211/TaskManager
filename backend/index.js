const express = require("express");
const cors = require('cors');
const app = express();

const userRoutes = require("./routes/UserRoutes");
const adminRoute = require("./routes/AdminRoutes");

const database = require("./config/Database");

const dotenv = require("dotenv");
dotenv.config();
app.use(cors({
    origin: '*',
}));
const PORT = process.env.PORT || 5000;
database.connect();

app.use(express.json());


app.use("/api/v1/user", userRoutes);

app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
