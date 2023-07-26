// models/user.model.js
import mongoose from "mongoose";
import notesRouter from "../routes/note.routes.js";

// o _id é criado automaticamente

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, // retirar espaços em branco
      unique: true, // só pode ter um no banco de dados inteiro
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/, //regex que verifica se o email está formatado corretamente
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6, // pelo menos 6 caracteres
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"], //aceita apenas as opções que estão dentro da array
      default: "user", //caso não seja passado nenhuma informação, será criado com o default
    },
    //algo com boolean
    active: {
      type: Boolean,
      default: true,
    },
    age: {
      type: Number,
      min: 18, // numero mínimo
      max: 65, // numero máximo
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  },
  {
    timestamps: true, // cria as chaves updatedAt e createUp automáticamente
  }
);

//com a Schema criada, vamos criar o model
// o model é a representação de uma coleção no banco de dados
// é pelo model que vamos fazer as operações no banco de dados

export default mongoose.model("User", userSchema);
