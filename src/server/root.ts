import { z } from "zod";
import { procedure, router } from "./trpc";
import { contactRouter } from "./routers/contacts";
import { shopping2Router } from "./routers/shopping2";

export const appRouter = router({
	contact: contactRouter,
	shopping2: shopping2Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
