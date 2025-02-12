import { Router } from "express";
import { query, validationResult,checkSchema,matchedData } from "express-validator";
import { userValidationSchema } from "../utils/validationSchema.js";
import { testing } from "../utils/constants.mjs";


const router = Router();

router.get("/api/test", query("filter").isString().notEmpty().isLength({ min: 3,max:10 }).withMessage("filter min 3 max 10"), (req, res) => {
  console.log(req.query);
//   console.log(req['express-validator#contexts'])
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
});

router.post("/api/test",checkSchema(userValidationSchema), (req, res) => {
  // console.log(req.body);
//   console.log(req.body);
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) {  
        return res.status(400).send({errors:result.array()});
    };
    const data = matchedData(req);
   
  const newData = { id: testing.length + 1, ...data };
  // const newData = req.body;
  testing.push(newData);
  return res.send(newData);
})

export default router;