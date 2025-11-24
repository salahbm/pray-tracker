import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const SKIP_AUTH_KEY = 'skipAuth';
export const Public = () => (target: any, key?: any, descriptor?: any) => {
  SetMetadata(IS_PUBLIC_KEY, true)(target, key, descriptor);
  SetMetadata(SKIP_AUTH_KEY, true)(target, key, descriptor);
  SetMetadata('auth:skip', true)(target, key, descriptor);
  return descriptor;
};
