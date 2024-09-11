import { Request } from "express";

interface ExtractTokenResult {
  token: string | undefined;
  authenticationType: "cookie" | "bearer" | undefined;
}

export function extractToken(request: Request): ExtractTokenResult {
  const authHeader = request.headers.authorization;
  let token: string | undefined = undefined;
  let authenticationType: "cookie" | "bearer" | undefined = undefined;

  if (authHeader) {
    const [type, tokenFromBearer] = authHeader.split(" ");
    if (type === "Bearer") {
      token = tokenFromBearer;
      authenticationType = "bearer";
    }
  }

  const tokenFromCookie = request.cookies?.token;
  if (tokenFromCookie) {
    token = tokenFromCookie;
    authenticationType = "cookie";
  }

  return { token, authenticationType };
}
