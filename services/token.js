import jwt from "jsonwebtoken";
import models from "../models";

async function checkToken(token) {
  let __id = null;
  try {
    const { _id } = await jwt.decode(token);
    __id = _id;
  } catch (e) {
    return false;
  }
  const user = await models.Usuario.findOne({ _id: __id, status: true });
  if (user) {
    const token = jwt.sign({ _id: __id, role: user.role }, "chavesecreta", {
      expiresIn: "1d"
    });
    return { token, role: user.role };
  } else {
    return false;
  }
}

export default {
  encode: async (_id) => {
    const user = await models.Usuario.findOne({ _id, status: true });
    const token = jwt.sign({ _id: _id, role: user.role }, "chavesecreta", {
      expiresIn: "1d"
    });
    return token;
  },
  decode: async (token) => {
    try {
      const { _id } = jwt.verify(token, "chavesecreta");
      console.log("cade a porra da chave fazendo efeito?");
      const user = await models.Usuario.findOne({ _id, status: true });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      console.log("será q caiu no catch do decode?");
      const newToken = await checkToken(token);
      return newToken;
    }
  }
};
