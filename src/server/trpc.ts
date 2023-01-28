import { TRPCError, initTRPC } from "@trpc/server";
import { prisma } from "../../prisma/db";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createContextInner>().create();
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

export async function createContextInner(opts?: CreateNextContextOptions) {
	return {
		prisma,
	};
}
