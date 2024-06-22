export interface TableBtn {
  styleClass: string;
  icon: string;
  iconColor?: string;
  payload: (any) => any;
  action: string;
  type: string;
  disable: (any) => boolean;
  permissionMsg?: (any) => string;
  showHidden?: (any) => boolean;
  isDragAndDrop?: (any) => boolean;
}
