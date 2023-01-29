import { trpc } from "@/utils/trpc";
import { Todo } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const Todos = () => {
	const todos = trpc.todo.getTodos.useQuery();
	const router = useRouter();
	const utils = trpc.useContext();
	const deleteTodo = trpc.todo.deleteTodo.useMutation({
		onSuccess() {
			utils.todo.getTodos.invalidate();
		},
	});
	return (
		<div>
			<div className="todo-card">
				{todos.data?.map((todo) => (
					<div key={todo.id}>
						<h1>Task : {todo.name}</h1>
						<h1>Priority : {todo.priority}</h1>
						<button onClick={() => router.push(`/todo/${todo.id}`)}>
							View
						</button>
						<button
							onClick={() => deleteTodo.mutate({ id: todo.id })}
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
