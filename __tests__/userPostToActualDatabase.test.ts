import request from "supertest";
import app from "../app";
import { Server } from 'http';
import { Sequelize } from 'sequelize';

let server: Server;
let sequelize: Sequelize;


beforeAll(async () => {
    server = app.listen(3000);

    // Initialize Sequelize with your database connection here
    sequelize = new Sequelize('postgresql://localhost:5432/sequlize-tutorial-test', {
        define: {
            freezeTableName: true,
            // timestamps: false
        }
    });

    // Sync the database
    await sequelize.sync({ force: true });
});

afterEach(async () => {
    await sequelize.sync({ force: true });  // This will clear the database after each test
});

afterAll(async () => {
    // Close the server and the Sequelize connection
    await sequelize.sync({ force: true });
    return Promise.all([
        new Promise(resolve => server.close(resolve)),
        sequelize.close()
    ]);
});

test("POST /api/customer", async () => {
    const newCustomer = {
        user_id: 1,
        username: "Mocked User",
        password: "Mocked Password",
        email: "Mocked Email",
        age: 18,
        occupation: "Mocked Occupation"
    };

    const res = await request(app).post("/api/user").send(newCustomer);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining(newCustomer));
});