import express, { Express, Request, Response } from 'express';
import { User } from '../models/user';
const router = express.Router();


router.get("/user", async (req: Request, res: Response) => {

    User.sync({ alter: true }).then(() => {
        return User.findAll();
    })
        .then((data) => {
            console.log('User added to the database Juhee X')
            const jsonData = data.map(element => element.toJSON());
            res.json(jsonData);
        })
        .catch(err => res.send('Error:' + err));

});

router.post("/user", async (req: Request, res: Response) => {
    User.sync({ alter: true }).then(() => {
        console.log("Post my User")
        console.log(req.body);
        return User.create(req.body);
    })
        .then((data) => {
            console.log('User added to the database Juhee X')
            console.log(data);
            res.json(data);
        })
        .catch(err => res.send('Error:' + err));
});
export default router;