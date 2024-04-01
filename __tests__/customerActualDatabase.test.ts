import request from "supertest";
import app from "../app";
import { Server } from 'http';
import { Sequelize } from 'sequelize';
import { Customer } from "../models/customer";

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

afterAll(() => {
    // Close the server and the Sequelize connection
    return Promise.all([
        new Promise(resolve => server.close(resolve)),
        sequelize.close()
    ]);
});

beforeEach(async () => {
    // Clear the database before each test
    await Customer.destroy({ where: {} });

    // Add some initial data to the database
    await Customer.create({ customerName: "Customer 1" });
    await Customer.create({ customerName: "Customer 2" });
});

describe("Test app.ts", () => {
    test("Catch-all route", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            { id: expect.any(Number), customerName: "Customer 1" },
            { id: expect.any(Number), customerName: "Customer 2" },
        ]);
    });
});