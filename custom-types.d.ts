import { Express } from "express-serve-static-core";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  image?: string;
  provider: string;
  token?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
