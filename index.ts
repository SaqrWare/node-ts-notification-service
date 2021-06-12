import {connect, set} from "mongoose";
import {KafkaClient as Client} from 'kafka-node';
import {KafkaConsumer} from './streaming/KafkaConsumer'
import {NotificationService} from "./service/NotificationService";
import {mongoConfig} from "./config/mongoConfig";
import {kafkaConfig} from "./config/kafkaConfig";
import EmailWrapper from "./service/integration/EmailWrapper";
import SMSWrapper from "./service/integration/SMSWrapper";
import PushNotificationWrapper from "./service/integration/PushNotificationWrapper";
import NotificationMessage from "./model/domain/NotificationMessage";

// Init db
connect(mongoConfig.connection, {useNewUrlParser: true}).then(() => console.log("DB connected"));
set("debug", mongoConfig.debug);

// init consumer
const client = new Client({kafkaHost: kafkaConfig.kafkaHost});
const kafkaConsumer: KafkaConsumer = new KafkaConsumer(
    client,
    kafkaConfig.topics.notificationTopic,
    {groupId: kafkaConfig.groupId}
)

// init service
const smsWrapper = new SMSWrapper()
const emailWrapper = new EmailWrapper()
const pushNotificationWrapper = new PushNotificationWrapper()

const notificationService = new NotificationService(smsWrapper, emailWrapper, pushNotificationWrapper)

kafkaConsumer.onMessage((message => {
    if (typeof message.value === "string") {
        const notificationMessage: NotificationMessage = JSON.parse(message.value)
        if (!notificationMessage.schedule) {
            return notificationService.SendNotification(notificationMessage).then(() => console.log("Notification sent"))
        } else {
            return notificationService.StoreNotification(notificationMessage).then(() => console.log("Notification sent"))
        }
    }
}))