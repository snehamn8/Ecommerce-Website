// backend/trpcRouter.js
const { initTRPC } = require('@trpc/server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const t = initTRPC.create();
const secret = "secret_key"; // replace with a secure key

const trpcRouter = t.router({
  register: t.procedure
    .input((z) => z.object({ name: z.string(), email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await prisma.user.create({
        data: { name: input.name, email: input.email, password: hashedPassword },
      });
      const token = jwt.sign({ userId: user.id }, secret);
      return { token };
    }),

  login: t.procedure
    .input((z) => z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({ where: { email: input.email } });
      if (!user || !(await bcrypt.compare(input.password, user.password))) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign({ userId: user.id }, secret);
      return { token };
    }),

  getCategories: t.procedure.query(async () => {
    return prisma.category.findMany({ take: 6 });
  }),

  savePreferences: t.procedure
    .input((z) => z.object({ userId: z.number(), categoryIds: z.array(z.number()) }))
    .mutation(async ({ input }) => {
      await prisma.user.update({
        where: { id: input.userId },
        data: { categories: { set: input.categoryIds.map(id => ({ id })) } },
      });
    }),
});

module.exports = trpcRouter;