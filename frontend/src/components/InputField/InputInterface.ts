export interface InputFieldInterface {
  title: string;
  type: string;
  placeholder: string;
  onChange: Function;
  error: boolean;
  errorMessage: string;
  required: boolean | undefined;
  name: string;
  value: string | number;
  onBlurFunction?: (e: any) => void;
}
