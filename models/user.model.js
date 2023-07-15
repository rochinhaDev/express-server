import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         trim: true,
         unique: true,
      },
      email: {
         type: String,
         required: true,
         match: /.+\@.+\..+/,
      },
      password: {
         type: String,
         required: true,
         trim: true,
         minlength: 6,
      },
      role: {
         type: String,
         required: true,
         enum: ["user", "admin"],
         default: "user",
      },
      //algo com boolean
      active: {
         type: Boolean,
         default: true,
      },
      age: {
         type: Number,
         min: 18,
         max: 65,
      },
   },
   {
      timestamps: true,
   }
);

//com a Schema criada, vamos criar o model
// o model é a representação de uma coleção no banco de dados
// é pelo model que vamos fazer as operações no banco de dados

export default mongoose.model("User", userSchema);
