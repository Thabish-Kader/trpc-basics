import { z } from "zod";
import { procedure, router } from "./trpc";
import { todoRouter } from "./routers/todo";
import { shopping2Router } from "./routers/shopping2";

export const appRouter = router({
	todo: todoRouter,
	shopping2: shopping2Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
