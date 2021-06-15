import models from "../models";
export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Produto.create(req.body);
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
      const reg = await models.Produto.findById({ _id });
      if (!reg) {
        res.status(404).send({
          message: "Registro não existe"
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {}
  },
  listUser: async (req, res, next) => {
    const usuario_id = req.query.usuario_id;
    const _limit = Number(req.query._limit);
    const _page = Number(req.query._page);
    const skip = Number((_page - 1) * _limit) || 0;

    console.log("ID DO USUARIO: ", usuario_id);
    console.log("Pagina atual no back: ", _page);
    console.log("Limite atual no back: ", _limit);

    try {
      let { valor } = req.query;
      console.log("valor no back: ", valor);
      const reg = await models.Produto.find(
        {
          usuario_id
        },
        { createdAt: 0 }
      )
        .limit(_limit)
        .skip(skip)
        .sort({
          createdAt: -1
        });
      //total de produtos
      const totalProdutos = await models.Produto.find({
        usuario_id
      }).countDocuments();

      res.status(200).json({
        reg,
        totalProdutos
      });
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
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
      const reg = await models.Produto.find(
        {
          $or: [
            { nome: new RegExp(valor, "i") },
            { descricao: new RegExp(valor, "i") }
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
      const totalProdutos = await models.Produto.find({
        $or: [
          { nome: new RegExp(valor, "i") },
          { descricao: new RegExp(valor, "i") }
        ]
      }).countDocuments();

      res.status(200).json({
        reg,
        totalProdutos
      });
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const _id = req.body._id;
      const { body } = req;
      const reg = await models.Produto.findByIdAndUpdate(_id, body, {
        new: true
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    console.log("Produto deletado id: ", req.params);

    try {
      const reg = await models.Produto.findByIdAndDelete({
        _id: req.params._id
      });
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
      const reg = await models.Produto.findByIdAndUpdate(
        { _id: req.body._id },
        {
          vendido: true
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
      const reg = await models.Produto.findByIdAndUpdate(
        { _id: req.body._id },
        {
          vendido: false
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro"
      });
      next(e);
    }
  }
};
