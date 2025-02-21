import passport from "passport";
import { Strategy } from "passport-local";
import {testing} from "../utils/constants.mjs";


passport.serializeUser((user, done) => {
    console.log("inside serializeUser");
    console.log(user);
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    console.log("inside deserializeUser");
    console.log(`Deserializing user with id: ${id}`);
    try{
        const findUser = testing.find((user)=> user.id === id );
    if (!findUser) {
        throw new Error("User not found");
    }
    done(null, findUser)
    } catch(err){
        done(err,null);
    }
});

export default passport.use(
    new Strategy(
        (username, password, done)=>{
            console.log(`Username: ${username}`);
            console.log(`password: ${password}`);
            try {
                const findUser = testing.find((user) => user.username === username);
                if (!findUser) {
                    throw new Error("User not found");
                }
                if (findUser.password !== password ){
                    throw new Error("Wrong password");
                }       
                done(null,findUser);         
            } catch(err){
                done(err,null);
            }
        }
    )
);