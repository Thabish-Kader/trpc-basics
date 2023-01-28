import { z } from "zod";
import { procedure, router } from "../trpc";

export const shoppingRouter = router({
	test: procedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query(({ input }) => {
			return {
				test: `hello ${input.text}`,
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
