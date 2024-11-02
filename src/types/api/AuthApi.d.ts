export interface userData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface SignInData {
  login: string;
  password: string;
}

export interface signUpData extends userData {
  password: string;
}

export interface userInfoData extends userData {
  [key: string]: any;

  id: number;
  display_name: string;
  avatar: string | null;
}
