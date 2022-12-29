declare global {
  interface StringConstructor {
    Empty: string;
  }
}
String.Empty = "";
export {};
