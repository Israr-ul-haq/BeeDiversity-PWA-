export interface IUser {
  status:  string;
  content: Content;
}

export interface Content {
  user:          User;
  authorization: Authorization;
}

export interface Authorization {
  userId:    string;
  expiresAt: Date;
  key:       string;
  id:        string;
}

export interface User {
  role:         string;
  firstName:    string;
  lastName:     string;
  emailAddress: string;
  password:     string;
  id:           string;
}
