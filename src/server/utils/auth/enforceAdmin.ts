import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { userIsAdmin } from "./userIsAdmin";

export const enforceAdmin = async () => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) notFound();

  const isAdmin = await userIsAdmin(userId, orgId);

  if (!isAdmin) notFound();

  return true;
};
