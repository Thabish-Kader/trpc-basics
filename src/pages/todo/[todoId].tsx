import { trpc } from "@/utils/trpc";
import { Todo } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TodoPage = () => {
	const router = useRouter();
	const utils = trpc.useContext();
	const id = parseInt(router.query.todoId as string);
	const todo = trpc.todo.getTodo.useQuery({ id });
	const [formData, setFormData] = useState<Todo>({
		id: 0,
		name: "",
		priority: "",
	});

	const updateTodo = trpc.todo.updateTodo.useMutation({
		onSuccess() {
			utils.todo.getTodo.invalidate();
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.name === "" || formData.priority === "")
			return alert("No Empty fields");
		updateTodo.mutate({
			id,
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
		<div className="main">
			<div>
				<h1>Task name : {todo.data?.name}</h1>
				<h2>Priority : {todo.data?.priority}</h2>
			</div>
			<form onSubmit={handleSubmit} className="inputs">
				<input
					type="text"
					placeholder="Enter new Todo"
					onChange={(e) =>
						setFormData({ ...formData, name: e.target.value })
					}
				/>
				<input
					type="text"
					onChange={(e) =>
						setFormData({ ...formData, priority: e.target.value })
					}
					placeholder="Enter new priority.."
				/>
				<button>Update</button>
			</form>
			<Link href="/">Back</Link>
		</div>
	);
};

export default TodoPage;
