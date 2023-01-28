import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/root";

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
	router: appRouter,

	createContext: () => ({}),
});
