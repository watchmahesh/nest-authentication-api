export interface Tokens {
  access_tokens ?: string;
  refresh_tokens ?: string;

}

export type JwtPayload = {
    email: string;
    sub: number;
  };