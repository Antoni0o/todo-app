import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import auth from "../config/auth";
import { AuthRequest } from "../@types/express";

export async function ensureAuthentication(req: AuthRequest, res: Response, next: NextFunction) {
  const authRequest = req.headers.authorization;

  if(!authRequest) {
    throw new AppError("You must have logged in to use this function!", 400)
  }

  const [, token] = authRequest.split(" ");

  try {
    const { sub: id } = verify(token, auth.jwt.secret);

    req.user = {
      id: String(id),
    };

    next();
  } catch {
    throw new AppError("Your access was invalidated! - Invalid Token", 400)
  }
}