import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("hi");
  res.send("sup");
});

export default router;
