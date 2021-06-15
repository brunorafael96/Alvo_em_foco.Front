import routerx from "express-promise-router";
import produtoController from "../controllers/ProdutoController";

const router = routerx();

router.post("/add", produtoController.add);
router.get("/query/:_id", produtoController.query);
router.get("/list", produtoController.list);
router.get("/listUser", produtoController.listUser);
router.put("/update", produtoController.update);
router.delete("/remove/:_id", produtoController.remove);
router.put("/activate", produtoController.activate);
router.put("/deactivate", produtoController.deactivate);

export default router;
