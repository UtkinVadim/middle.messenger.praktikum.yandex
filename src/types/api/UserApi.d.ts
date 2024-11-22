import type { userData } from './AuthApi.d.ts';

export interface changeUserData extends userData {
  display_name: string;
}

export interface changePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface changeAvatarData {
  avatar: File;
}
