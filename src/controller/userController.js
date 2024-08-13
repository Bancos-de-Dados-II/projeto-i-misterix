import { Router } from "express";
import sequelize from "./data/sequelize.js";
import { generateAccessToken } from "./jwtService.js";
import { checkLoginModel } from "./middlewares.js";

const userRouter = new Router();

userRouter.post('/signup', checkLoginModel, async (req, res) => {
    const {login, password} = req.body;
    try{
        await sequelize.models.User.create({login, password});
        const token = generateAccessToken(login);
        res.status(201).json(token);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

userRouter.post('/login', checkLoginModel, async (req, res) => {
    const {login, password} = req.body;
    try{
        const user = await sequelize.models.User.findByPk(login);
        if(password == user.password)
            res.status(200).json(generateAccessToken(login));
        else
            res.sendStatus(401);    
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

export default userRouter;