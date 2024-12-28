declare module "#auth-utils" {
  interface User {
    firstName: string;
    publicID: string;
  }

  interface UserSession {
    isStaff?: boolean;
  }

  interface SecureSessionData {
    isStaff?: boolean;
    publicID?: string;
  }
}

export {};
