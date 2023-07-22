// routes/user.routes.js
import express from "express";
import UserModel from "../models/user.model.js";

const router = express.Router(); // instanciar roteador

// url: http://localhost:4000/user/create
router.post("/create", async (req, res) => {
  try {
    const form = req.body; //tudo o que foi enviado no insomnia, será guardado dentro dessa variável

    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    //Isso é lidar com o erro
    console.log(error);
    return res.status(500).json(error);
  }
});

// url: http://localhost:4000/user/all
router.get("/all", async (req, res) => {
  // Código para obter todos os usuários ativos e retornar a resposta
});

// url: http://localhost:4000/user/:id
router.get("/:id_user", async (req, res) => {
  try {
    const id_user = req.params.id_user;
    console.log(id_user);
    const one_user = await UserModel.findById(id_user).populate("recipes");

    return res.status(200).json(one_user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// url: http://localhost:4000/user/update/:id
router.put("/update/:id", async (req, res) => {
  // Código para atualizar um usuário pelo ID e retornar a resposta
});

// url: http://localhost:4000/user/delete/:id
router.delete("/delete/:id", async (req, res) => {
  // Código para deletar um usuário pelo ID (soft delete) e retornar a resposta
});

//exportar routeador
export default router;
