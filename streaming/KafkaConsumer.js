"use strict";
exports.__esModule = true;
exports.KafkaConsumer = void 0;
var kafka_node_1 = require("kafka-node");
var KafkaConsumer = /** @class */ (function () {
    function KafkaConsumer(client, topic, options) {
        this.consumer = new kafka_node_1.Consumer(client, [{ topic: topic }], options);
    }
    KafkaConsumer.prototype.onMessage = function (cb) {
        this.consumer.on("message", cb);
    };
    return KafkaConsumer;
}());
exports.KafkaConsumer = KafkaConsumer;
