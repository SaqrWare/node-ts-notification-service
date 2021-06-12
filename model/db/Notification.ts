import {Schema, model} from 'mongoose';
import NotificationMessage from "../domain/NotificationMessage";

const schema = new Schema<NotificationMessage>({
    NotificationId: String,
    type: String,
    template: String,
    messageParams: Object,
    schedule: Date
});

const NotificationModel = model<NotificationMessage>('Notification', schema);

export = NotificationModel;