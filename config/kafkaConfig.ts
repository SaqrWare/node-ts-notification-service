export const kafkaConfig = {
    kafkaHost: process.env.KAFKA_HOST || "localhost:9092",
    groupId: process.env.GROUP_ID || "notification-group-id",
    topics: {
        notificationTopic: process.env.NOTIFICAITON_TOPIC || "NOTIFICATION_TOPIC"
    }

}