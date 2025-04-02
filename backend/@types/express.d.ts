
declare global {
  namespace Express {
    interface User {
      id: string;
      userId: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
    }

    interface Request {
      user?: User
    }
  }
}

export {};
