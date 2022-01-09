import { Router } from "express";

import { AddArticleAndCartController } from "./controller/AddArticleAndCartController";

const addArticleAndCartController = new AddArticleAndCartController();

const router = Router();

router.post("/add_article_and_cart", addArticleAndCartController.handler);

export { router };
