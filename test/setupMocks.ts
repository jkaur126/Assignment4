// --- Mock Firebase Admin SDK ---
jest.mock("../config/firebaseConfig", () => ({
  firestore: jest.fn(() => ({
    collection: jest.fn().mockReturnValue({
      add: jest.fn().mockResolvedValue({ id: "mockLoanId" }),
      get: jest.fn().mockResolvedValue({
        docs: [
          {
            id: "loan1",
            data: () => ({
              applicantName: "Mock User 1",
              loanAmount: 1000,
              loanPurpose: "Testing Purpose 1",
            }),
          },
          {
            id: "loan2",
            data: () => ({
              applicantName: "Mock User 2",
              loanAmount: 2000,
              loanPurpose: "Testing Purpose 2",
            }),
          },
          {
            id: "loan3",
            data: () => ({
              applicantName: "Mock User 3",
              loanAmount: 3000,
              loanPurpose: "Testing Purpose 3",
            }),
          },
        ],
      }),
      doc: jest.fn().mockReturnValue({
        update: jest.fn().mockResolvedValue({}),
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({
            applicantName: "Mock User",
            loanAmount: 1234,
            loanPurpose: "Testing Loan",
          }),
        }),
      }),
    }),
  })),
}));

jest.mock("../src/api/v1/middleware/authMiddleware", () => ({
  authenticate: jest.fn((_req, _res, next) => {
    next(); // Always pass authentication
  }),
}));

// --- Mock Authorization Middleware globally ---
jest.mock("../src/api/v1/middleware/authorizeMiddleware", () => ({
  authorize: jest.fn(() => {
    return (_req: any, _res: any, next: any) => {
      next(); // Always allow authorization
    };
  }),
}));
