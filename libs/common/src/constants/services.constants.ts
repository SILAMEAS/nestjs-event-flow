export const SERVICES = {
  API_GATEWAY: 'api-gateway',
  AUTH_SERVICE: 'auth-service',
  USER_SERVICE: 'user-service',
  EVENT_SERVCIE: 'event-service',
  TICKET_SERVICE: 'ticket-service',
  PAYMENT_SERVICE: 'payment-service',
  NOTIFICATION: 'notification-service',
} as const;
export type Service = (typeof SERVICES)[keyof typeof SERVICES];

const BASE_PORT = 4100;

export const SERVICES_PORT = {
  API_GATEWAY: BASE_PORT,
  AUTH_SERVICE: BASE_PORT + 1,
  USER_SERVICE: BASE_PORT + 2,
  EVENT_SERVICE: BASE_PORT + 3,
  TICKET_SERVICE: BASE_PORT + 4,
  PAYMENT_SERVICE: BASE_PORT + 5,
  NOTIFICATION_SERVICE: BASE_PORT + 6,
} as const;

export const getServiceName = (key: keyof typeof SERVICES) => SERVICES[key];

export const getPort = (key: keyof typeof SERVICES_PORT) => SERVICES_PORT[key];

export const getKeyByServiceName = (
  name: (typeof SERVICES)[keyof typeof SERVICES],
) => {
  return Object.keys(SERVICES).find(
    (key) => SERVICES[key as keyof typeof SERVICES] === name,
  ) as keyof typeof SERVICES | undefined;
};

export const getPortByServiceName = (
  name: (typeof SERVICES)[keyof typeof SERVICES],
) => {
  const key = getKeyByServiceName(name);
  return key ? SERVICES_PORT[key] : undefined;
};
