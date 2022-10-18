require("express-async-errors");
require("dotenv/config");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const uploadConfigs = require("./configs/upload");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files/meals", express.static(uploadConfigs.MEALS_FOLDER));
app.use("/files/ingredients", express.static(uploadConfigs.INGREDIENTS_FOLDER));

app.use(routes);

const PORT = process.env.PORT || 3000;

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.json({
      status: error.statusError,
      message: error.message,
    });
  }

  console.log(error);

  return response.json({
    status: 501,
    message: "Erro interno do servidor.",
  });
});

app.listen(PORT, () => console.log("Server is running on PORT:", PORT));
