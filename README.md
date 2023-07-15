# API DOCS

Documentação mais detalhada no meu [notion!](https://karenokasaki.notion.site/MongoDB-mongoose-441db4521692488aa3fae05e482cc460?pvs=4)

**_url_base: http://localhost/4000_**

| Verbo HTTP | Path             | Descrição                               | Resposta (Response)                                              |
| ---------- | ---------------- | --------------------------------------- | ---------------------------------------------------------------- |
| POST       | /user/create     | Cria um novo usuário                    | O objeto JSON do usuário criado (newUser)                        |
| GET        | /user/all        | Obtém todos os usuários ativos          | Uma lista de objetos JSON contendo os usuários ativos (allUsers) |
| GET        | /user/:id        | Obtém um usuário pelo ID                | O objeto JSON do usuário com o ID especificado (user)            |
| PUT        | /user/update/:id | Atualiza um usuário pelo ID             | O objeto JSON do usuário atualizado (user)                       |
| DELETE     | /user/delete/:id | Deleta um usuário pelo ID (soft delete) | Mensagem de sucesso ("Usuário deletado com sucesso")             |

## Se conecte com o banco de dados

`/config/db.config.js`

```javascript
import mongoose from "mongoose";

export default async function connectDB() {
   try {
      const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`Connection on db: ${dbConnection.connection.name}`);
   } catch (error) {
      console.log(error);
   }
}
```

`index.js`

```javascript
// config //
import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import cors from "cors";
// routes //
import userRouter from "./routes/user.route.js";

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

// colocar o servidor no ar
app.listen(4000, () => {
   console.log("Server up and running on port 4000");
});
```

## 1. Criar a Schema

### 1.1. Definir a Schema

-  Dentro da pasta `/models`, crie o arquivo que vai definir sua schema.
-  Lembre-se de que a Schema é o que determina quais e como as informações serão salvas no seu banco de dados.
-  Transforme a Schema em um Model.
-  Exporte o Model, pois ele será nossa maneira de interagir com a tabela que acabamos de criar.

### 1.2. Exemplo de Schema:

```javascript
// models/user.model.js
import mongoose from "mongoose";

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
   },
   {
      timestamps: true, // cria as chaves updatedAt e createUp automáticamente
   }
);

//com a Schema criada, vamos criar o model
// o model é a representação de uma coleção no banco de dados
// é pelo model que vamos fazer as operações no banco de dados

export default mongoose.model("User", userSchema);
```

[Para mais informações sobre validadores de campo](https://www.notion.so/karenokasaki/c8f3605bbea0493db2ae7d956e585319?v=e5a6f19e53a14afb886fa81bbb2cf0f5&pvs=4)

# 2. Crie uma rota

-  Dentro da pasta `/routes`, crie o arquivo que vai definir suas rotas.
-  Não se esqueça de instanciar o `express` e o seu router.
-  Defina o nome da rota e a função que será invocada sempre que houver uma chamada para a API.
-  Faça um CRUD completo.
-  Exporte o Router no final do arquivo.

```javascript
// routes/user.routes.js
import express from "express";
import UserModel from "../models/user.model.js";

const router = express.Router(); // instanciar roteador

// url: http://localhost:4000/user/create
router.post("/create", async (req, res) => {
   // Código para criar um novo usuário e retornar a resposta
});

// url: http://localhost:4000/user/all
router.get("/all", async (req, res) => {
   // Código para obter todos os usuários ativos e retornar a resposta
});

// url: http://localhost:4000/user/:id
router.get("/:id", async (req, res) => {
   // Código para obter um usuário pelo ID e retornar a resposta
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
```

# 3. Faça o roteamento

-  No arquivo `index.js`, configure o servidor para direcionar todas as chamadas que começarem com "/user" para a rota criada anteriormente.

```javascript
app.use("/user", userRouter);
```

# 4. Agora teste sua rota no Insomnia

-  Certifique-se de que o servidor esteja em execução e teste as rotas no Insomnia para verificar se as respostas estão sendo retornadas corretamente.

```json
{
   "username": "karenokasaki",
   "password": "SenhaSegura@123",
   "email": "oks.karen@gmail.com",
   "age": 30
}
```

# 5. Verifique seu banco de dados

-  Entre no seu banco de dados pelo **MongoCompass** para verificar se as alterações estão sendo salvas corretamente na tabela de usuários.

# 6. Erros comuns

-  Erro 404 - NOT FOUND

   -  Provavelmente você está tentando fazer uma chamada para um rota que não existe. Cheque se o _NOME DA ROTA_ está correto e se o _VERBO_ é o mesmo.

-  Erro 500 - Internal Server Erro
   -  Normalmente significa que seu servidor não está ligado. Confira se você executou o comando `npm run dev`
   -  O seu terminal deve estar assim:
      -  _Server up and running on port 4000_
      -  _Conectado com o DB nomeDoDB_
