import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const fileOperations = sequelize.define("fileOperations", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileSize: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileExtension: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bucketName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default fileOperations;