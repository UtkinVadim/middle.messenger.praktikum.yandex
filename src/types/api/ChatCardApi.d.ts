export interface userData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
}

export interface addUserToChatData {
  users: Array<number>;
  chatId: string;
}
