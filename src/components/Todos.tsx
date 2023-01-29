import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const Todos = () => {
	const todos = trpc.todo.getTodos.useQuery();
	const router = useRouter();
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
					</div>
				))}
			</div>
		</div>
	);
};
