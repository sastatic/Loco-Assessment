const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

describe("Transaction Service API", () => {
  beforeAll(async () => {
    await prisma.transaction.deleteMany();
    await prisma.transaction.createMany({
      data: [
        { id: 1, amount: 5000, type: "cars", parent_id: null },
        { id: 2, amount: 10000, type: "shopping", parent_id: 1 },
        { id: 3, amount: 3000, type: "cars", parent_id: 1 },
        { id: 4, amount: 2000, type: "electronics", parent_id: null },
        { id: 5, amount: 1500, type: "shopping", parent_id: 2 },
        { id: 6, amount: 1000, type: "shopping", parent_id: 2 },
      ],
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("PUT /transactionservice/transaction/:transaction_id", () => {
    it("should create a new transaction", async () => {
      const res = await request(app)
        .put("/transactionservice/transaction/7")
        .send({ amount: 2000, type: "groceries", parent_id: 4 });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: "ok" });
    });
  });

  describe("GET /transactionservice/transaction/:transaction_id", () => {
    it("should return the transaction details", async () => {
      const res = await request(app).get("/transactionservice/transaction/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: 1,
        amount: 5000,
        type: "cars",
        parent_id: null,
      });
    });
  });

  describe("GET /transactionservice/types/:type", () => {
    it("should return all transactions of a type", async () => {
      const res = await request(app).get("/transactionservice/types/cars");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([1, 3]);
    });
  });

  describe("GET /transactionservice/sum/:transaction_id", () => {
    it("should return the sum of all transactions linked to a specific transaction", async () => {
      const res = await request(app).get("/transactionservice/sum/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ sum: 19500 });
    });
  });

  describe("Concurrent Requests", () => {
    it("should handle concurrent requests correctly", async () => {
      const concurrentRequests = [
        request(app).get("/transactionservice/sum/1"),
        request(app).get("/transactionservice/sum/2"),
        request(app).get("/transactionservice/types/cars"),
        request(app)
          .put("/transactionservice/transaction/8")
          .send({ amount: 3000, type: "electronics", parent_id: 4 }),
        request(app).get("/transactionservice/transaction/3"),
      ];

      const responses = await Promise.all(concurrentRequests);

      // Validate the responses
      expect(responses[0].status).toBe(200);
      expect(responses[0].body).toEqual({ sum: 19500 });

      expect(responses[1].status).toBe(200);
      expect(responses[1].body).toEqual({ sum: 12500 });

      expect(responses[2].status).toBe(200);
      expect(responses[2].body).toEqual([1, 3]);

      expect(responses[3].status).toBe(200);
      expect(responses[3].body).toEqual({ status: "ok" });

      expect(responses[4].status).toBe(200);
      expect(responses[4].body).toEqual({
        id: 3,
        amount: 3000,
        type: "cars",
        parent_id: 1,
      });
    });
  });
});
