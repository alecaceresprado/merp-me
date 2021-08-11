export type loginDetails = {
  email: string;
  password: string;
}

export type signupDetails = {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
}

export type validationResult = {
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    userName?: string;
  },
  valid: boolean
}

export type userDBObject = {
  createdAt: string;
  email: string;
  userId: string;
  userName: string;
}
