import express, { Express, Request, Response } from 'express';
import { Customer } from '../models/customer';
const router = express.Router();

router.post("/customers", async (req: Request, res: Response) => {
    Customer.sync({ alter: true }).then(() => {
        console.log("Customer Created")
        console.log(req.body);
        return Customer.create(req.body);
    })
        .then((data) => {
            console.log('Customer added to the database Juhee X')
            console.log(data);
            res.json(data);
        })
        .catch(err => res.send('Error:' + err));
});

router.get("/customers", async (req: Request, res: Response) => {

    Customer.sync({ alter: true }).then(() => {
        return Customer.findAll();
    })
        .then((data) => {
            console.log('Customer added to the database Juhee X')
            const jsonData = data.map(element => element.toJSON());
            res.json(jsonData);
        })
        .catch(err => res.send('Error:' + err));

});
export default router;