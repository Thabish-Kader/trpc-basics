import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from "../../../prisma/db";

export const contactRouter = router({
	addTodo: procedure
		.input(
			z.object({
				name: z
					.string({ required_error: "This field cannot be empty" })
					.max(10, { message: "Cannot be more that 10 characters" }),
				priority: z.string().max(5),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const data = await prisma.todo.create({
				data: {
					name: input.name,
					priority: input.priority,
				},
			});
			return data;
		}),
	getTodos: procedure.query(async ({ input, ctx }) => {
		const data = await prisma.todo.findMany({});
		return data;
	}),
});
