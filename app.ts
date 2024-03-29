import express, { Application, Express, Request, Response } from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { User } from './models/user';
import userRoutes from './routes/user.routes';
import { sequelize } from './database';
const app: Application = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-requested-with");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req: Request, res: Response) => {
//     User.sync({ alter: true }).then(() => {
//         return User.findAll();
//     })
//         .then((data) => {
//             console.log('User added to the database Juhee X')
//             const jsonData = data.map(element => element.toJSON());
//             res.json(jsonData);
//         })
//         .catch(err => res.send('Error:' + err));
// });

app.get('/', (req: Request, res: Response): void => {
    let users = ["Goon", "Tsuki", "Joe"];
    res.status(200).send(users);
});

app.use("/api", userRoutes);

export default app;