import { Router } from "express";

import { AddToCartController } from "./controller/AddToCartController";

const addToCartController = new AddToCartController();

const router = Router();

router.post("/addtocart", addToCartController.handler);

export { router };
