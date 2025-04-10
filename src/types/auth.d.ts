export interface IUserRegistrationParams {
  email: string;
  password: string;
  username: string;
  supabaseId?: string;
}

export interface IVerifyOtpParams {
  email: string;
  token: string;
  type: 'signup' | 'email';
}

export interface IUserDelete {
  id: string;
  supabaseId: string;
}
