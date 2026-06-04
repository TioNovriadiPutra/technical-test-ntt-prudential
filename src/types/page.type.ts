export type UserProfileType = {
  profilePic: string;
  fullName: string;
  roleName: string;
};

export type TableRowDataType = {
  variant:
    | "text"
    | "badge"
    | "currency"
    | "rating"
    | "statusSuccess"
    | "statusFailed"
    | "statusWarning";
  value: string | string[];
};

export type TableRowType = {
  id: number;
  data: TableRowDataType[];
};

export type TableMetaType = {
  total: number;
  from: number;
  to: number;
};

export type TableType = {
  header: string[];
  row: TableRowType[];
  meta: TableMetaType;
};

export type DropdownType = {
  label: string;
  value: string | number;
};
