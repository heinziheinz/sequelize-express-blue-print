import request from "supertest";
import app from "../app";
import { Server } from 'http';

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
        expect(res.body).toEqual(["Goon", "Tsuki", "Joe"]);
    });
});
