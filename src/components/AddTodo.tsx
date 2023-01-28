import { trpc } from "@/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";

import React, { useState } from "react";

type TodoData = {
	name: string;
	priority: string;
};
export const AddTodo = () => {
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState<TodoData>({
		name: "",
		priority: "",
	});
	const addTodo = trpc.contact.addTodo.useMutation({
		onSuccess(data, variables, context) {
			queryClient.invalidateQueries("getTodos");
		},
	});

	return (
		<div>
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
			<button
				onClick={() =>
					addTodo.mutate({
						name: formData.name,
						priority: formData.priority,
					})
				}
			>
				Add
			</button>
		</div>
	);
};
