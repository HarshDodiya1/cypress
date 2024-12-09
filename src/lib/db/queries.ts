"use server";
import { validate } from "uuid";
import db from "./db";
import { File, Folder, Subscription, User, Workspace } from "./supabase.types";

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

export const getWorkspaceDetails = async (workspaceId: string) => {
  const isValid = validate(workspaceId);
  console.log("Kya valid hai? ", isValid);
  if (!isValid)
    return {
      data: [],
      error: "Error",
    };

  try {
    const response = (await db.workspace.findFirst({
      where: {
        id: workspaceId,
      },
    })) as Workspace;
    return { data: response ? [response] : [], error: null };
  } catch (error) {
    console.log(error);
    return { data: [], error: "Error" };
  }
};

export const getFolderDetails = async (folderId: string) => {
  const isValid = validate(folderId);
  if (!isValid) {
    data: [];
    error: "Error";
  }

  try {
    const response = (await db.folder.findFirst({
      where: {
        id: folderId,
      },
    })) as Folder;
    return { data: response ? [response] : [], error: null };
  } catch (error) {
    return { data: [], error: "Error" };
  }
};

export const findUser = async (userId: string) => {
  // const response = await db.query.users.findFirst({
  //   where: (u, { eq }) => eq(u.id, userId),
  // });
  const response = await db.user.findFirst({
    where: {
      id: userId,
    },
  });
  return response;
};

export const getFileDetails = async (fileId: string) => {
  const isValid = validate(fileId);
  if (!isValid) {
    return {
      data: [],
      error: "Error",
    };
  }
  try {
    const response = (await db.file.findFirst({
      where: {
        id: fileId,
      },
    })) as File;
    return { data: response ? [response] : [], error: null };
  } catch (error) {
    return { data: [], error: "Error" };
  }
};

export const addCollaborators = async (users: User[], workspaceId: string) => {
  const response = users.forEach(async (user: User) => {
    const userExists = await db.collaborator.findFirst({
      where: {
        workspaceId: workspaceId,
        userId: user.id,
      },
    });
    if (!userExists) {
      await db.collaborator.create({
        data: {
          workspaceId: workspaceId,
          userId: user.id,
        },
      });
    }
  });
};

export const getUsersFromSearch = async (email: string) => {
  if (!email) return [];
  // const accounts = db
  //   .select()
  //   .from(users)
  //   .where(ilike(users.email, `${email}%`));
  const accounts = db.user.findMany({
    where: {
      email: {
        startsWith: email,
      },
    },
  });
  return accounts;
};

export const getCollaborators = async (workspaceId: string) => {
  const response = await db.collaborator.findMany({
    where: {
      workspaceId: workspaceId,
    },
  });
  if (!response.length) return [];
  const userInformation: Promise<User | null>[] = response.map(async (user) => {
    const exists = await db.user.findUnique({
      where: {
        id: user.userId,
      },
    });
    return exists;
  });
  const resolvedUsers = await Promise.all(userInformation);
  return resolvedUsers.filter(Boolean) as User[];
};

export const createFolder = async (folder: Folder) => {
  try {
    // const results = await db.insert(folders).values(folder);
    const results = await db.folder.create({
      data: folder,
    });
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const createFile = async (file: File) => {
  try {
    // await db.insert(files).values(file);
    await db.file.create({
      data: file,
    });
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const updateFolder = async (
  folder: Partial<Folder>,
  folderId: string
) => {
  try {
    // await db.update(folders).set(folder).where(eq(folders.id, folderId));
    await db.folder.update({
      where: {
        id: folderId,
      },
      data: folder,
    });
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const updateFile = async (file: Partial<File>, fileId: string) => {
  try {
    const response = await db.file.update({
      where: {
        id: fileId,
      },
      data: file,
    });
    return { data: response, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const updateWorkspace = async (
  workspace: Partial<Workspace>,
  workspaceId: string
) => {
  if (!workspaceId) return;
  try {
    const response = await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data: workspace,
    });
    return { data: response, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const removeCollaborators = async (
  users: User[],
  workspaceId: string
) => {
  const response = users.forEach(async (user: User) => {
    const userExists = await db.collaborator.findFirst({
      where: {
        workspaceId: workspaceId,
        userId: user.id,
      },
    });
    if (userExists) {
      await db.collaborator.delete({
        where: {
          userId_workspaceId: {
            userId: user.id,
            workspaceId: workspaceId,
          },
        },
      });
    }
  });
};

export const deleteWorkspace = async (workspaceId: string) => {
  if (!workspaceId) return;
  try {
    await db.workspace.delete({
      where: {
        id: workspaceId,
      },
    });
    return { data: null, error: null };
  } catch (error) {
    console.log("Error while deleting the workspace: ", error);
    return { data: null, error: "Error" };
  }
};

export const deleteFile = async (fileId: string) => {
  if (!fileId) return;

  await db.file.delete({
    where: {
      id: fileId,
    },
  });
};

export const deleteFolder = async (folderId: string) => {
  if (!folderId) return;
  await db.folder.delete({
    where: {
      id: folderId,
    },
  });
};
