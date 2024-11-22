export type MethodOptions = {
  credentials?: string;
  mode?: string;
  method?: string;
  timeout?: number;
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

export type RequestOptions = {
  method: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
}
