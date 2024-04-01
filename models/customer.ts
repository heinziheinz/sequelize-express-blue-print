import { DataTypes } from 'sequelize';
import { sequelize } from './../database';
import CustomerInstance from './customerinterface';
const Customer = sequelize.define<CustomerInstance>('customer', {
    customerName: {
        type: DataTypes.STRING,
        unique: true,
    }
});

export { Customer };