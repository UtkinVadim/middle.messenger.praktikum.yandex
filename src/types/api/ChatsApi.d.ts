export interface GetChatsData {
  offset: number; // The number of items to skip before starting to collect the result set
  limit: number; // The numbers of items to return
  title?: string; // Chat's title to filter by
}

export interface CreateChatData {
  title: string;
}

export interface DeleteChatData {
  chatId: number;
}
