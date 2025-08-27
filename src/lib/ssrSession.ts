"use server";

import { serverSignOut } from "~/lib/session.server";

export const eventSignOut = async (): Promise<void> => {
    await serverSignOut();
};