import mongoose, { Schema } from "mongoose";
const usuarioSchema = new Schema({
  role: { type: String, maxlength: 30, required: true, default: "user" },
  nome: { type: String, maxlength: 50, required: true },
  email: { type: String, maxlength: 50, unique: true, required: true },
  password: { type: String, maxlength: 64, required: true },
  cep: { type: Number, maxlength: 10 },
  rua: { type: String, maxlength: 50 },
  numero: { type: Number, maxlength: 10 },
  bairro: { type: String, maxlength: 100 },
  cidade: { type: String, maxlength: 20 },
  estado: { type: String, maxlength: 20 },
  produtos: [],
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
