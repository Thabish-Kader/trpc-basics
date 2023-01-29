import { trpc } from "@/utils/trpc";
import { Todo } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

import React, { FormEvent, useState } from "react";

type TodoData = {
	name: string;
	priority: string;
};
export const AddTodo = () => {
	const utils = trpc.useContext();
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState<Todo>({
		id: 0,
		name: "",
		priority: "",
	});
	const addTodo = trpc.todo.addTodo.useMutation({
		onSuccess() {
			utils.todo.getTodos.invalidate();
		},
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (formData.name === "" || formData.priority === "")
			return alert("No Empty fields");
		addTodo.mutate({
			name: formData.name,
			priority: formData.priority,
		});
		setFormData({
			id: 0,
			name: "",
			priority: "",
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={formData.name}
				onChange={(e) =>
					setFormData({ ...formData, name: e.target.value })
				}
				className=""
				placeholder="Add To do..."
			/>
			<input
				value={formData.priority}
				onChange={(e) =>
					setFormData({ ...formData, priority: e.target.value })
				}
				type="text"
				className=""
				placeholder="Priority.."
			/>
			<button type="submit">Add</button>
		</form>
	);
};
