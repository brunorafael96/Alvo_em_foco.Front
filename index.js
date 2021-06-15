import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from "./routes";

// database mongoDB conection
const uri = "mongodb://localhost:27017/dbsistema";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
};

mongoose.Promise = global.Promise;
mongoose.connect(uri, options).then(
  () => {
    console.log("Conectado ao MongoDB");
  },
  (err) => {
    err;
  }
);

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//router
app.use("/api", router);

app.set("port", process.env.PORT || 3030);

app.listen(app.get("port"), () => {
  console.log(`Server na porta: `, app.get("port"));
});
