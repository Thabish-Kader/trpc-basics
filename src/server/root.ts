import { z } from "zod";
import { procedure, router } from "./trpc";
import { shoppingRouter } from "./routers/shopping";
import { shopping2Router } from "./routers/shopping2";

export const appRouter = router({
	shopping: shoppingRouter,
	shopping2: shopping2Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
