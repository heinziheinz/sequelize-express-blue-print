import express, { Application, Express, Request, Response } from 'express';

import { Customer } from './models/customer';
import userRoutes from './routes/user.routes';
import customerRoutes from './routes/customer.routes';
const app: Application = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-requested-with");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    Customer.sync({ alter: true }).then(() => {
        return Customer.findAll();
    })
        .then((data) => {
            console.log('User added to the database Juhee X')
            console.log(data);
            const jsonData = data.map(element => element.toJSON());
            console.log("jsonData");
            console.log(jsonData);
            res.json(data);
        })
        .catch(err => res.send('Error:' + err));
});

// app.get('/', (req: Request, res: Response): void => {
//     let users = ["Goon", "Tsuki", "Joe"];
//     res.status(200).send(users);
// });

app.use("/api", userRoutes);
app.use("/api", customerRoutes);

export default app;