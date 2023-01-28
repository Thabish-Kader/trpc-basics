import { AddTodo } from "@/components/AddTodo";
import { Todos } from "@/components/Todos";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>trpc</title>
			</Head>
			<AddTodo />
			<Todos />
		</>
	);
}
