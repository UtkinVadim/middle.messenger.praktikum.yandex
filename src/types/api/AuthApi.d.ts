interface userData {
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
