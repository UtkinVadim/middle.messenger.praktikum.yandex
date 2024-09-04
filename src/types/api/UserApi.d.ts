import type { userData } from './AuthApi.d.ts';

export interface changeUserData extends userData {
  display_name: string;
}
