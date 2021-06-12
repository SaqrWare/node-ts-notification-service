import UserModel from "../model/db/User";
import Mustache from "mustache"
import NotificationModel from "../model/db/Notification";
import SMSWrapper from "./integration/SMSWrapper";
import EmailWrapper from "./integration/EmailWrapper";
import PushNotificationWrapper from "./integration/PushNotificationWrapper";
import NotificationMessage from "../model/domain/NotificationMessage";
import {NotificationType} from "../model/enum/NotificationType";
import {messageTemplates} from "../model/templates/messageTemplates";

export class NotificationService {
    private smsWrapper: SMSWrapper;
    private emailWrapper: EmailWrapper;
    private pushNotificationWrapper: PushNotificationWrapper;

    //TODO: use Dependency injection
    constructor(smsWrapper: SMSWrapper, emailWrapper: EmailWrapper, pushNotificationWrapper: PushNotificationWrapper) {
        this.smsWrapper = smsWrapper;
        this.emailWrapper = emailWrapper;
        this.pushNotificationWrapper = pushNotificationWrapper;
    }

    async SendNotification(notificationMessage: NotificationMessage) {
        const user = await UserModel.findById(notificationMessage.userID).exec();

        // Check user existed
        if (!user) throw "User_NOT_FOUND"

        // Creating body and title from template
        const body = Mustache.render(messageTemplates[notificationMessage.template].body, notificationMessage.messageParams)
        const title = Mustache.render(messageTemplates[notificationMessage.template].title, notificationMessage.messageParams)

        // Pick service according to notification type
        switch (notificationMessage.type) {
            case NotificationType.SMS:
                return this.smsWrapper.sendSMS(user.phone, body)
            case NotificationType.Email:
                return this.emailWrapper.sendEmail(user.email, title, body)
            case NotificationType.PushNotification:
                return this.pushNotificationWrapper.sendNotification(user.PNToken, title, body)
        }
    }

    async StoreNotification(notificationMessages: NotificationMessage) {
        return NotificationModel.create(notificationMessages)
    }
}