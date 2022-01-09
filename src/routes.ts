import { Router } from "express";

import { AddArticleAndCartController } from "./controller/AddArticleAndCartController";
import { CheckoutOrderController } from "./controller/CheckoutOrderController";
import { ensureError } from "./middlewares/ensureError";

const addArticleAndCartController = new AddArticleAndCartController();
const checkoutOrderController = new CheckoutOrderController();

const router = Router();

router.post("/add_article_and_cart", addArticleAndCartController.handler);
router.post("/checkout_order", checkoutOrderController.handler);

router.use(ensureError);
export { router };
