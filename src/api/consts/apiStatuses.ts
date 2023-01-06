export const apiStatuses = {
  IDLE: Symbol('IDLE'),
  PENDING: Symbol('PENDING'),
  SUCCESS: Symbol('SUCCESS'),
  FAILED: Symbol('FAILED'),
};

export type ApiStatuses = typeof apiStatuses;
export type ApiStatusKeys = keyof ApiStatuses;
export type ApiStatusValues = ApiStatuses[ApiStatusKeys];
