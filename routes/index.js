import routerx from "express-promise-router";
import produtoRouter from "./produto";
import usuarioRouter from "./usuario";

const router = routerx();
router.use("/produto", produtoRouter);
router.use("/usuario", usuarioRouter);
export default router;
