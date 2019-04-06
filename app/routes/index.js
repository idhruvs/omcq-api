const express = require("express");
const recommendationRoutes = require("./recommendations");
const router = new express();
/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

router.use("/recommendations", recommendationRoutes);

module.exports = router;
