import models from "../models";
import bcryptjs from "bcryptjs";
import token from "../services/token";

export default {
  add: async (req, res, next) => {
    console.log("Usuário: ", req.body);
    try {
      req.body.password = await bcryptjs.hash(req.body.password, 10);
      const reg = await models.Usuario.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    const _id = req.params._id;
    try {
      const reg = await models.Usuario.findById({ _id });
      if (!reg) {
        res.status(404).send({
          message: "Registro não existe"
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {}
  },
  list: async (req, res, next) => {
    const _limit = Number(req.query._limit);
    const _page = Number(req.query._page);
    const skip = Number((_page - 1) * _limit) || 0;

    console.log("Pagina atual no back: ", _page);
    console.log("Limite atual no back: ", _limit);

    try {
      let { valor } = req.query;
      console.log("valor no back: ", valor);
      const reg = await models.Usuario.find(
        {
          $or: [
            { nome: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") }
          ]
        },
        { createdAt: 0 }
      )
        .limit(_limit)
        .skip(skip)
        .sort({
          createdAt: -1
        });
      //total de produtos
      const totalUsuarios = await models.Usuario.find({
        $or: [
          { nome: new RegExp(valor, "i") },
          { email: new RegExp(valor, "i") }
        ]
      }).countDocuments();

      res.status(200).json({
        reg,
        totalUsuarios
      });
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    const _id = req.body._id;

    console.log("update: ", req.body);
    try {
      if (req.body.password == "" || req.body.password == undefined) {
        delete req.body.password;
        const reg = await models.Usuario.findByIdAndUpdate(_id, req.body, {
          new: true
        });
        reg.password = "";
        res.status(200).json(reg);
      }

      let pass = req.body.password;
      const user = await models.Usuario.findOne({ _id });
      if (pass != user.password) {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
      }

      const reg = await models.Usuario.findByIdAndUpdate(
        _id,
        req.body,
        {
          new: true
        },
        { password: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Usuario.findByIdAndDelete({ _id: req.body._id });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        {
          status: true
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        {
          status: false
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  },
  login: async (req, res, next) => {
    const email = req.body.payload.email;
    const password = req.body.payload.password;

    try {
      let user = await models.Usuario.findOne({
        email: email,
        status: true
      });
      if (user) {
        let match = await bcryptjs.compare(password, user.password);
        if (match) {
          console.log("Role em controller: ", user.role);
          let tokenReturn = await token.encode(user._id, user.role);
          user.password = "";
          res.status(200).json({ user, tokenReturn });
        } else {
          res.status(407).send({
            message: "Credencias inválidas"
          });
        }
      } else {
        res.status(404).send({
          message: "Não existe o usuário"
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  }
};
