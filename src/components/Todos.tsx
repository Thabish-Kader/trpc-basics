import { trpc } from "@/utils/trpc";
import React, { useState } from "react";

export const Todos = () => {
	const todos = trpc.todo.getTodos.useQuery();

	return (
		<div>
			<div className="todo-card">
				{todos.data?.map((todo) => (
					<div key={todo.id}>
						<h1>Task : {todo.name}</h1>
						<h1>Priority : {todo.priority}</h1>
						<button>View</button>
					</div>
				))}
			</div>
		</div>
	);
};
