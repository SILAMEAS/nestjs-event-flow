export const SERVICES = {
    API_GATEWAY: "api-gateway",
    AUTH_SERVICE: "auth-service",
    USER_SERVICE: "user-service",
    EVENT_SERVCIE: "event-service",
    TICKET_SERVICE: "ticket-service",
    PAYMENT_SERVICE: "payment-service",
    NOTIFICATION: "notification-service"
} as const;

const port = 50;

export const SERVICES_PORT = {
    API_GATEWAY: +`${port}00`,
    AUTH_SERVICE: +`${port}01`,
    USER_SERVICE: +`${port}02`,
    EVENT_SERVICE: +`${port}03`,
    TICKET_SERVICE: +`${port}04`,
    PAYMENT_SERVICE: +`${port}05`,
    NOTIFICATION_SERVICE: +`${port}06`,
} as const;