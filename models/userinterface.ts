import { Model } from 'sequelize';
export default interface UserInstance extends Model {
    user_id: number;
    username: string;
    password: string;
    email: string;
    age: number;
    occupation: string;
}