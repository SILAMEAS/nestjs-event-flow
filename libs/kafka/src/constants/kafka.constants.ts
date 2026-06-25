export const KAFKA_BROKER = process.env.KAKFA_BROKER ?? "localhost:9092";
export const KAFKA_CLIENT_ID = 'eventflowapp';
export const KAFKA_CONSUMER_GROUP = 'eventflowapp-consumer'

// KAFKA Topics 

export const KAFKA_TOPICS = {
    // Auth events
    USER_REGISTERED: 'user.registerd',
    USER_LOGIN: 'user.login',
    PASSWORD_RESET_REQUESTED: "user.password-reset-requested",

    // Event events
    EVENT_CREATED: "event.created",
    EVENT_UPDATED: "event.updated",
    EVENT_CANCEL: "event.cancel",

    // Ticket events
    TICKET_PUCHASED: "ticket.purchased",
    TICKET_CANCELED: "ticket.cancel",
    TICKET_CHECKED_IN: "ticket.checked-in",

    // Event events
    PAYMENT_COMPLETED: "payment.completed",
    PAYMENT_FAILED: "payment.failed",
    PAYMENT_REFUNED: "payment.refuned",

    // Notification trigger
    SENT_EMAIL: "notification.send-email",
    SENT_PUSH: "notification.send-push",


} as const;

export type kafkaTopics = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS];
