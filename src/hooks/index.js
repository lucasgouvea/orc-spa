import { useAuth } from "./auth";

export * from "./driver/hooks";
export * from "./vehicle/hooks";
export * from "./company";
export * from "./auth";
export * from "./local-storage";
export * from "./user/hooks";

export function useHeaders() {
  const {
    user: { token }
  } = useAuth();

  return { Authorization: `Bearer ${token}` };
}
