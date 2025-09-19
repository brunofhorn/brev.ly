export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export interface PrefixInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix: string;
  error?: boolean;
}
