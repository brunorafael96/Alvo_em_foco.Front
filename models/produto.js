import mongoose, { Schema } from "mongoose";

const ProdutoSchema = new Schema({
  nome: {
    type: String,
    maxlength: 50,
    unique: true,
    required: true
  },
  preco: {
    type: Number,
    maxlength: 11,
    required: true,
    default: 9999
  },
  vendido: {
    type: Boolean,
    default: 0
  },
  descricao: {
    type: String,
    maxlength: 255,
    required: false
  },
  fotos: {
    type: String,
    maxlength: 255
  },
  usuario_id: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Produto = mongoose.model("produto", ProdutoSchema);

export default Produto;
