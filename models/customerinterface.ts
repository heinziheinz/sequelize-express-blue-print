import { Model } from 'sequelize';
export default interface CustomerInstance extends Model {
    customerName: string;
}