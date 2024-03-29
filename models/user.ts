// models/user.ts
import { DataTypes } from 'sequelize';
import { sequelize } from './../database';
import UserInstance from './userinterface';

const User = sequelize.define<UserInstance>('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 20]// username must be between 3 and 20 characters
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 18
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false
    }

},
    // {
    // freezeTableName: true,// can be done globally in sequelize instance
    // timestamps: false
    // }
);

export { User }; 
