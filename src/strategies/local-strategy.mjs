import passport from "passport";
import { Strategy } from "passport-local";
import {testing} from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";


passport.serializeUser((user, done) => {
    console.log("inside serializeUser");
    console.log(user);
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    // console.log("inside deserializeUser");
    // console.log(`Deserializing user with id: ${id}`);
    try{
        const findUser = await User.findById(id);
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
        async(username, password, done)=>{

            try {
                const findUser = await User.findOne({username});
                if(!findUser){
                    throw new Error("Username not found");
                }
                if( findUser.password !== password){
                    throw new Error("Wrong password");
                }
                // const findUser = testing.find((user) => user.username === username);
                // if (!findUser) {
                //     throw new Error("User not found");
                // }
                // if (findUser.password !== password ){
                //     throw new Error("Wrong password");
                // }       
                done(null,findUser);         
            } catch(err){
                done(err,null);
            }
        }
    )
);