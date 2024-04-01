import request from "supertest";
import app from "../app";
import { Server } from 'http';

const mockedUser = {
    user_id: 1,
    username: "Mocked User",
    password: "Mocked Password",
    email: "Mocked Email",
    age: 18,
    occupation: "Mocked Occupation"
};

jest.mock("../models/user", () => ({
    User: {
        sync: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({
            user_id: 1,
            username: "Mocked User",
            password: "Mocked Password",
            email: "Mocked Email",
            age: 18,
            occupation: "Mocked Occupation"
        })
    }
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
        const res = await request(app).post("/api/user").send(mockedUser);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            user_id: 1,
            username: "Mocked User",
            password: "Mocked Password",
            email: "Mocked Email",
            age: 18,
            occupation: "Mocked Occupation"
        });
    });
});

