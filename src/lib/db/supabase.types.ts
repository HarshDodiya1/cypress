import { Prisma } from "@prisma/client";

// Basic model types
export type Workspace = Prisma.WorkspaceGetPayload<{}>;
export type User = Prisma.UserGetPayload<{}>;
export type Folder = Prisma.FolderGetPayload<{}>;
export type File = Prisma.FileGetPayload<{}>;
export type Product = Prisma.ProductGetPayload<{}>;
export type Price = Prisma.PriceGetPayload<{}>;
export type Customer = Prisma.CustomerGetPayload<{}>;
export type Subscription = Prisma.SubscriptionGetPayload<{}>;
// Types with relations
export type WorkspaceWithRelations = Prisma.WorkspaceGetPayload<{
  include: {
    folders: true;
    files: true;
    collaborators: true;
  };
}>;

export type FolderWithRelations = Prisma.FolderGetPayload<{
  include: {
    workspace: true;
    files: true;
  };
}>;

export type FileWithRelations = Prisma.FileGetPayload<{
  include: {
    workspace: true;
    folder: true;
  };
}>;

export type ProductWithPrice = Prisma.ProductGetPayload<{
  include: {
    prices: true;
  };
}>;

export type PriceWithProduct = Prisma.PriceGetPayload<{
  include: {
    product: true;
  };
}>;

export type SubscriptionWithRelations = Prisma.SubscriptionGetPayload<{
  include: {
    price: {
      include: {
        product: true;
      };
    };
    user: true;
  };
}>;

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    subscriptions: {
      include: {
        price: true;
      };
    };
    collaborators: true;
  };
}>;
