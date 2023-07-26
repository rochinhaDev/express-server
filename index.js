// config //
import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import cors from "cors";
// routes //
import userRouter from "./routes/user.routes.js";
import recipeRouter from "./routes/recipe.routes.js";
import noteRouter from "./routes/note.routes.js";

//criar o servidor
const app = express();

//habilitar o express para receber dados em json
app.use(express.json());

//configurar as variáveis de ambientes
dotenv.config();

//habilitar o cors
app.use(cors());

//se conectar com o banco de dados
connectDB();

//rotas para tabelas diferentes
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/note", noteRouter);

// colocar o servidor no ar
app.listen(4000, () => {
  console.log("Server up and running on port 4000");
});
