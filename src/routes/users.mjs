import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { userValidationSchema } from "../utils/validationSchema.js";
import { testing } from "../utils/constants.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router();

router.get(
  "/api/test",
  query("filter")
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage("filter min 3 max 10"),
  (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
req.sessionStore.get(req.session.id, (err, sessionData) => {
  if (err) {
    console.log(err);
    throw  err;
  }
  console.log(sessionData);
})
    // console.log(req.query);
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;
    if (filter && value) {
      return res
        .status(200)
        .send(testing.filter((data) => data[filter].includes(value)));
    } else {
      return res.status(200).send(testing);
    }
    // return res.status(200).send(testing);
  }
);

router.get("/api/test/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = testing[findUserIndex];
  if (!findUser) {
    return res.sendStatus(404);
  }
  return res.status(200).send(findUser);
});

router.put("/api/test/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  testing[findUserIndex] = { id: testing[findUserIndex].id, ...body };
  return res.send(testing);
});

router.post("/api/test", checkSchema(userValidationSchema), (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }
  const data = matchedData(req);

  const newData = { id: testing.length + 1, ...data };

  testing.push(newData);
  return res.send(newData);
});
router.patch("/api/test/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  testing[findUserIndex] = { ...testing[findUserIndex], ...body };
  res.status(200).send(testing);
});

router.delete("/api/test/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  testing.splice(findUserIndex, 1);
  res.status(200).send(testing);
});

export default router;
