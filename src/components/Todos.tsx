import { trpc } from "@/utils/trpc";
import React from "react";

export const Todos = () => {
	const todos = trpc.todo.getTodos.useQuery();
	return (
		<div>
			<div className="todo-card">
				{todos.data?.map((todo) => (
					<div key={todo.id}>
						<h1>{todo.name}</h1>
						<h1>{todo.priority}</h1>
					</div>
				))}
			</div>
		</div>
	);
};
