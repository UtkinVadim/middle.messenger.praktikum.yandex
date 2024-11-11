export interface MessageData {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: string;
}

export interface OldMessageData {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
  content: string;
}
