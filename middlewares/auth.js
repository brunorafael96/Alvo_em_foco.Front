import tokenService from "../services/token.js";

export default {
  verifyUsuario: async (req, res, next) => {
    try {
      console.log("token no auth: ", req.headers.token);
      if (!req.headers.token) {
        return res.status(404).send({ message: "Não existe token" });
      }
      const response = await tokenService.decode(req.headers.token);
      console.log("response em auth: ", response);

      if (response.role == "user" || response.role == "adm") {
        console.log("deu meio bom");
        next();
      } else {
        return res.status(403).send({
          message: "não autorizado kkk"
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  verifyAdministrador: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({ message: "Token inválido" });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.role == "adm") {
      next();
    } else {
      return res.status(403).send({ message: "não autorizado" });
    }
  }
};
