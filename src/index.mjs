import express, { response } from "express";
import indexRouter from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import {testing} from "./utils/constants.mjs";
import "./strategies/local-strategy.mjs";
// import usersRouter from "./routes/users.mjs";
// import productsRouter from "./routes/products.mjs";

const app = express();

app.use(express.json());
app.use(session({
  secret:"this is the secret",
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:60000 * 60,
  }
}));
app.use(cookieParser("helloWorld"));
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRouter)
// app.use(usersRouter);
// app.use(productsRouter);

// const loggingMiddleware = (req, res, next) => {
//   console.log(`${req.method} - ${req.url}`);
//   next();
// };

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("testingCookieName","thisTheValueOfCookie",{maxAge:10000,signed:true });
  res.status(200).send({ message: "ini testing" });
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

app.get("/api/auth/status",(req,res)=>{
  console.log("inside status auth endpoint");
  console.log(req.user);
  console.log(req.session)
  return req.user ? res.send(req.user): res.sendStatus(401);
})

app.post("/api/auth/logout",(req,res)=>{
  if(!req.user){
    return res.sendStatus(401);
  }
  req.logout((err)=>{
    if(err){
      return res.sendStatus(400);
    }
    res.sendStatus(200);
  })
})
// app.post("/api/auth",(req,res)=>{
  
//   const {body : {username,password}} = req;
//   const findUser = testing.find(
//     user => user.username === username
//   );
//   if (!findUser || findUser.password !== password) return res.sendStatus(401).send({msg: "CREDENTIALS NOT FOUND"}); 
//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// })


// app.get("/api/auth/status",(req,res)=>{
//   req.sessionStore.get(req.session.id, (err, sessionData) => {
//     console.log(sessionData);
//   });
//   return req.session.user ? res.status(200).send(req.session.user): res.status(401).send({msg:"NOT LOGGED IN"});
// });

app.post("/api/cart",(req,res)=>{
  if(!req.session.user) return res.sendStatus(401);
  const {body: item} = req;

  const {cart} = req.session;
  if (cart){
    cart.push(item);
  }else{
    req.session.cart = [item];
  }
  return res.status(201).send(item)
});

app.get("/api/cart", (req, res) => {
  if(!req.session.user) return res.sendStatus(401);
  return res.send(req.session.cart ?? [])
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});



// app.use(loggingMiddleware);
// const resolveIndexByUserId = (req, res, next) => {
//   const {
//     params: { id },
//   } = req;
//   const parseId = parseInt(id);
//   if (isNaN(parseId)) {
//     return res.sendStatus(400);
//   }
//   const findUserIndex = testing.findIndex((data) => data.id === parseId);
//   if (findUserIndex === -1) {
//     return res.sendStatus(404);
//   }
//   req.findUserIndex = findUserIndex;
//   next();
// };

// const testing = [
//   { id: 1, username: "alice", fullname: "Alice Wonderland" },
//   { id: 2, username: "bob", fullname: "Bob Builder" },
//   { id: 3, username: "charlie", fullname: "Charlie Brown" },
//   { id: 4, username: "david", fullname: "David Goliath" },
//   { id: 5, username: "eve", fullname: "Eve Smith" },
//   { id: 6, username: "frank", fullname: "Frank Sinatra" },
//   { id: 7, username: "grace", fullname: "Grace Hopper" },
//   { id: 8, username: "heidi", fullname: "Heidi Klum" },
//   { id: 9, username: "ivan", fullname: "Ivan Drago" },
//   { id: 10, username: "judy", fullname: "Judy Garland" },
//   { id: 11, username: "karl", fullname: "Karl Marx" },
//   { id: 12, username: "lisa", fullname: "Lisa Simpson" },
// ];


// app.use(loggingMiddleware,(req,res,next) => {
//     console.log("finishing middleware");
//     next();
// });


// app.get("/api/test", query("filter").isString().notEmpty().isLength({ min: 3,max:10 }).withMessage("filter min 3 max 10"), (req, res) => {
//   console.log(req.query);
// //   console.log(req['express-validator#contexts'])
// const result = validationResult(req);
// console.log(result);
//   const {
//     query: { filter, value },
//   } = req;
//   if (filter && value) {
//     return res
//       .status(200)
//       .send(testing.filter((data) => data[filter].includes(value)));
//   } else {
//     return res.status(200).send(testing);
//   }
//   // return res.status(200).send(testing);
// });

// app.get("/api/test/:id", resolveIndexByUserId, (req, res) => {
//   // res.status(200).send({message:`ini id ${req.params.id}`});
//   // console.log(req.params);
//   // const parseId = parseInt(req.params.id);
//   // console.log(parseId);
//   // if(isNaN(parseId)){
//   //     res.status(404).send({message:"id not found"});
//   // }else{
//   //     const data = testing.find((data)=>data.id === parseId);
//   //     if(data){
//   //         res.status(200).send(data);
//   //     }else{
//   //         res.status(404).send({message:"id not found"});
//   //     }
//   // }
//   const { findUserIndex } = req;
//   const findUser = testing[findUserIndex];
//   if (!findUser) {
//     return res.sendStatus(404);
//   }
//   return res.status(200).send(findUser);
// });

// app.post("/api/test",checkSchema(userValidationSchema), (req, res) => {
//   // console.log(req.body);
// //   console.log(req.body);
//     const result = validationResult(req);
//     console.log(result);
//     if (!result.isEmpty()) {  
//         return res.status(400).send({errors:result.array()});
//     };
//     const data = matchedData(req);
   
//   const newData = { id: testing.length + 1, ...data };
//   // const newData = req.body;
//   testing.push(newData);
//   return res.send(newData);
// });

// app.put("/api/test/:id", resolveIndexByUserId, (req, res) => {
//   // const { body, params: { id } } = req;
//   // const parseId = parseInt(id);
//   // if (isNaN(parseId)) {
//   //     return res.sendStatus(400);
//   // }
//   // const findUserIndex = testing.findIndex((data) => data.id === parseId);
//   // if (findUserIndex === -1) {
//   //     return res.sendStatus(404);
//   // }
//   const { body, findUserIndex } = req;
//   testing[findUserIndex] = { id: testing[findUserIndex].id, ...body };
//   return res.send(testing);
// });

// app.patch("/api/test/:id", resolveIndexByUserId, (req, res) => {
//   const { body, findUserIndex } = req;
//   // const  { body, params: { id }} = req;
//   // const parseId = parseInt(id);
//   // if (isNaN(parseId)) return res.sendStatus(400);
//   // const findUserIndex = testing.findIndex((data)=>data.id === parseId);
//   // if (findUserIndex === -1) return res.sendStatus(404);
//   testing[findUserIndex] = { ...testing[findUserIndex], ...body };
//   res.status(200).send(testing);
// });

// app.delete("/api/test/:id", resolveIndexByUserId, (req, res) => {
//   const { findUserIndex } = req;
//   // const parseId = parseInt(id);
//   // if (isNaN(parseId)) return res.sendStatus(400);
//   // const findUserIndex = testing.findIndex((data)=>data.id === parseId);
//   // if (findUserIndex === -1) return res.sendStatus(404);
//   testing.splice(findUserIndex, 1);
//   res.status(200).send(testing);
// });
