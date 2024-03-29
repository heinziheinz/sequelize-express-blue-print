// database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://localhost:5432/sequelize-tutorial', {
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

export { sequelize };