import {Consumer, ConsumerOptions, KafkaClient, Message} from "kafka-node";
export class KafkaConsumer {
    private consumer: Consumer;

    constructor(client: KafkaClient, topic: string, options: ConsumerOptions) {
        this.consumer = new Consumer(client, [{topic}], options);
    }

    onMessage(cb: (message: Message) => any) {
        this.consumer.on("message", cb)
    }
}
