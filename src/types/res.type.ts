export type ResType<T = any> = {
  success: boolean;
  message: string;
  data: T;
};
