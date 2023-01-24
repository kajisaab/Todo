export interface SelectInterface {
  withText: boolean;
  data?: {
    label: string | number;
    value: string | number;
    detail?: object | null;
  }[];
  onClick: Function;
  placeholder: string;
}
