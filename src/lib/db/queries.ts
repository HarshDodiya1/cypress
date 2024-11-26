"use server";
import { validate } from "uuid";
import db from "./db";
import { Subscription, Workspace } from "./supabase.types";

export const createWorkspace = async (workspacece: Workspace) => {
  try {
    const response = await db.workspace.create({
      data: workspacece,
    });
    console.log("This is I'm returning: ", response);
  } catch (error) {
    console.log("Error while creating the workspace: ", error);
  }
};

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const data = await db.subscription.findFirst({
      where: {
        userId: userId,
      },
    });
    if (data) return { data: data as Subscription, error: null };
    else return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: `Error` };
  }
};

export const getFiles = async (folderId: string) => {
  const isValid = validate(folderId);
  if (!isValid) return { data: null, error: "Error" };
  try {
    const results = await db.file.findMany({
      where: {
        folderId: folderId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return { data: results, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};
