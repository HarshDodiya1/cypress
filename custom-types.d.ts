import { Express } from "express-serve-static-core";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  google_id: string;
  image?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
