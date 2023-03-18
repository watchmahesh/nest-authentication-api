import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }strategy
  async validate(req:Request,payload: { userId: number }) {
    const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}