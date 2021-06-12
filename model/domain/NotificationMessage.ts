import {NotificationType} from "../enum/NotificationType";

export default interface NotificationMessage {
    userID: string,
    type: NotificationType,
    template: string,
    messageParams: object,
    schedule?: string
}