export interface TableColumn {
  columnHide?: boolean;
  columnDef: string;
  columnSearch: string;
  header: string;
  headerTextAlign?: string;
  cell: (any) => string;
  sort: boolean;
  directionSort: string;
  activeSort: boolean;
  isMask?: boolean;
  maskType?: string;
  type?: string;
  isEditable?: (any) => boolean;
  isEdit?: boolean;
  alignContent?: string;
  isCalculate?: boolean;
  isCurrency?: boolean;
  footerText?: string;
  footerNumberOfDecimalPlaces?: string;
}
