import { ReactNode } from "react";
import { isAuthorized } from "../queries";
import { redirect } from "next/navigation";

interface RequiredAuthProps {
  signInUrl: string;
  children: ReactNode
}

export async function RequiredAuth({ signInUrl, children }: RequiredAuthProps) {
  if (!await isAuthorized()) {
    redirect(signInUrl);
  }

  return children;
}