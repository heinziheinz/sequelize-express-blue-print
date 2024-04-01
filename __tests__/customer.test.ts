import request from "supertest";
import app from "../app";
import { Server } from 'http';
import { Sequelize } from 'sequelize';
import { Customer } from "../models/customer";

jest.mock("../models/customer", () => ({
    Customer: {
        sync: jest.fn().mockResolvedValue(null),
        findAll: jest.fn().mockResolvedValue([
            { customerName: "Mocked Customer 1", toJSON: () => ({ customerName: "Mocked Customer 1" }) },
            { customerName: "Mocked Customer 2", toJSON: () => ({ customerName: "Mocked Customer 2" }) },
        ]),
    },
}));
let server: Server;

beforeAll((done) => {
    server = app.listen(3000, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Test app.ts", () => {
    test("Catch-all route", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            { customerName: "Mocked Customer 1" },
            { customerName: "Mocked Customer 2" },
        ]);
    });
});


// describe("Test app.ts", () => {
//     test("Catch-all route", async () => {
//         const res = await request(app).get("/");
//         expect(res.body).toEqual(["Goon", "Tsuki", "Joe"]);
//     });
// });
