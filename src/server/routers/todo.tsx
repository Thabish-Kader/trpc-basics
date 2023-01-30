import { z } from "zod";
import { procedure, router } from "../trpc";

export const todoRouter = router({
	// add todo
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
			const data = await ctx.prisma.todo.create({
				data: {
					name: input.name,
					priority: input.priority,
				},
			});
			return data;
		}),
	// get all todos
	getTodos: procedure.query(async ({ input, ctx }) => {
		const data = await ctx.prisma.todo.findMany({});
		return data;
	}),
	// get single todo
	getTodo: procedure
		.input(
			z.object({
				id: z.number(),
			})
		)
		.query(async ({ input, ctx }) => {
			const data = await ctx.prisma.todo.findUnique({
				where: {
					id: input.id,
				},
			});
			return data;
		}),
	// update todo
	updateTodo: procedure
		.input(
			z.object({
				id: z.number(),
				name: z.string(),
				priority: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			return await ctx.prisma.todo.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
					priority: input.priority,
				},
			});
		}),
	// delete Todo
	deleteTodo: procedure
		.input(
			z.object({
				id: z.number(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const data = await ctx.prisma.todo.delete({
				where: {
					id: input.id,
				},
			});
			return data;
		}),
});
