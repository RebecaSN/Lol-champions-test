export interface TableMenu {
  styleClass: string;
  icon: string;
  payload: (any) => string | any;
  action: string;
  description: string;
  disable: (any) => boolean;
  permissionMsg?: (any) => string;
}
