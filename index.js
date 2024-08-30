import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import fileRoutes from "./routes/fileRoute.js";
import morgan from "morgan";


dotenv.config();

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use("/api/v1/AWS", fileRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
      console.log(`App running in ${process.env.NODE_ENV} mode`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
