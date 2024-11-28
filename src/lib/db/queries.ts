"use server";
import { validate } from "uuid";
import db from "./db";
import { Folder, Subscription, Workspace } from "./supabase.types";

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
    console.log("This is the userid I'm getting", userId);
    const data = await db.subscription.findFirst({
      where: {
        id: userId,
      },
    });

    if (data) return { data: data as Subscription, error: null };
    else return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: `Error` };
  }
};

export const getFolders = async (workspaceId: string) => {
  const isValid = validate(workspaceId);
  if (!isValid)
    return {
      data: null,
      error: "Error",
    };

  try {
    const results: Folder[] | [] = await db.folder.findMany({
      where: {
        workspaceId: workspaceId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return { data: results, error: null };
  } catch (error) {
    console.log("Error while fetching folders: ", error);
    return { data: null, error: "Error" };
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

export const getPrivateWorkspaces = async (userId: string) => {
  if (!userId) return [];
  // const privateWorkspaces = (await db
  //   .select({
  //     id: workspaces.id,
  //     createdAt: workspaces.createdAt,
  //     workspaceOwner: workspaces.workspaceOwner,
  //     title: workspaces.title,
  //     iconId: workspaces.iconId,
  //     data: workspaces.data,
  //     inTrash: workspaces.inTrash,
  //     logo: workspaces.logo,
  //     bannerUrl: workspaces.bannerUrl,
  //   })
  //   .from(workspaces)
  //   .where(
  //     and(
  //       notExists(
  //         db
  //           .select()
  //           .from(collaborators)
  //           .where(eq(collaborators.workspaceId, workspaces.id))
  //       ),
  //       eq(workspaces.workspaceOwner, userId)
  //     )
  //   )) as workspace[];
  const privateWorkspaces = (await db.workspace.findMany({
    where: {
      AND: [
        {
          NOT: {
            collaborators: {
              some: {
                workspaceId: {
                  equals: undefined,
                },
              },
            },
          },
        },
        {
          workspaceOwner: userId,
        },
      ],
    },
    select: {
      id: true,
      createdAt: true,
      workspaceOwner: true,
      title: true,
      iconId: true,
      data: true,
      inTrash: true,
      logo: true,
      bannerUrl: true,
    },
  })) as Workspace[];
  return privateWorkspaces;
};

export const getCollaboratingWorkspaces = async (userId: string) => {
  if (!userId) return [];
  // const collaboratedWorkspaces = (await db
  //   .select({
  //     id: workspaces.id,
  //     createdAt: workspaces.createdAt,
  //     workspaceOwner: workspaces.workspaceOwner,
  //     title: workspaces.title,
  //     iconId: workspaces.iconId,
  //     data: workspaces.data,
  //     inTrash: workspaces.inTrash,
  //     logo: workspaces.logo,
  //     bannerUrl: workspaces.bannerUrl,
  //   })
  //   .from(users)
  //   .innerJoin(collaborators, eq(users.id, collaborators.userId))
  //   .innerJoin(workspaces, eq(collaborators.workspaceId, workspaces.id))
  //   .where(eq(users.id, userId))) as workspace[];
  const collaboratedWorkspaces = (await db.workspace.findMany({
    where: {
      collaborators: {
        some: {
          user: {
            id: userId,
          },
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
      workspaceOwner: true,
      title: true,
      iconId: true,
      data: true,
      inTrash: true,
      logo: true,
      bannerUrl: true,
    },
  })) as Workspace[];
  return collaboratedWorkspaces;
};

export const getSharedWorkspaces = async (userId: string) => {
  if (!userId) return [];
  // const sharedWorkspaces = (await db
  //   .selectDistinct({
  //     id: workspaces.id,
  //     createdAt: workspaces.createdAt,
  //     workspaceOwner: workspaces.workspaceOwner,
  //     title: workspaces.title,
  //     iconId: workspaces.iconId,
  //     data: workspaces.data,
  //     inTrash: workspaces.inTrash,
  //     logo: workspaces.logo,
  //     bannerUrl: workspaces.bannerUrl,
  //   })
  //   .from(workspaces)
  //   .orderBy(workspaces.createdAt)
  //   .innerJoin(collaborators, eq(workspaces.id, collaborators.workspaceId))
  //   .where(eq(workspaces.workspaceOwner, userId))) as workspace[];
  const sharedWorkspaces = (await db.workspace.findMany({
    where: {
      workspaceOwner: userId,
    },
    distinct: ["id"],
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      createdAt: true,
      workspaceOwner: true,
      title: true,
      iconId: true,
      data: true,
      inTrash: true,
      logo: true,
      bannerUrl: true,
    },
  })) as Workspace[];
  return sharedWorkspaces;
};
