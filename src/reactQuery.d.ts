import { ResType } from "./types/res.type";
import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ResType;
  }
}
