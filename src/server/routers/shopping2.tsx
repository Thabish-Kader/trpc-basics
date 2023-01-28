import { z } from "zod";
import { procedure, router } from "../trpc";

export const shopping2Router = router({
	test5: procedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query(({ input }) => {
			return {
				test: `test5 ${input.text}`,
			};
		}),
	test2: procedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query(({ input: { text }, ctx }) => {
			return {
				test2: `This is test ${text}`,
			};
		}),
});
