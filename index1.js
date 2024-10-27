// app.js or index.js

const express = require('express');
const { initTRPC } = require('@trpc/server');
const { createExpressMiddleware } = require('@trpc/server/adapters/express');

// Initialize Express app
const app = express();

// Initialize tRPC
const t = initTRPC.create();
const appRouter = t.router({
  // Define procedures here, e.g.,
  greet: t.procedure.query(() => {
    return 'Hello from tRPC!';
  }),
});

// Middleware setup
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}), // Context for each request
  })
);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
});