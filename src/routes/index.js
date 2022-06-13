const express = require("express");
const router = express.Router();
const { startSession } = require("mongoose");

const money = require("../app/models/money.model");

// Create account
router.post("/v1/api/user", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const ressult = await money.create({
      userId,
      amount,
    });

    res.json({
      status: "OK",
      data: ressult,
    });
  } catch (error) {
    res.send(error);
  }
});

// Transfer A => B
router.post("/v1/api/transfer", async (req, res) => {
  const session = await startSession();
  try {
    const { fromId, toId, amount } = req.body;

    //create startSession
    session.startTransaction();

    const amountFrom = await money.findOneAndUpdate(
      { userId: +fromId },
      {
        $inc: {
          amount: -amount,
        },
      },
      {
        session,
        new: true,
      }
    );

    console.log(`Account ${fromId} is:::: ${amountFrom}`);
    const amountTo = await money.findOneAndUpdate(
      { userId: +toId },
      {
        $inc: {
          amount: +amount,
        },
      },
      {
        session,
        new: true,
      }
    );
    console.log(`Account ${toId} is:::: ${amountTo}`);

    return res.json({
      msg: "Transfer is OK!",
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// route root
router.get("/", async (req, res) => {
  res.send("say hi!");
});

module.exports = router;
