Todo:
- [X] Notification service
  - [X] SMS
  - [X] EMail
  - [X] Push Notification
- [ ] Unit test
- [X] Docker
- [X] Service communication Kafka


This service consumes message from kafka , can be replicated, integrated with 3 3rd party APIs to provide 3 types of notifications
, includes templates for different types of messages examples in  `model/templates`

Requirements:
  - NodeJS(14 recommended)
  - Kafka
  - Mongo DB

Environment Variables: 
  - KAFKA_HOST: kafka brokers ips
  - GROUP_ID: kafka group id for consumers
  - NOTIFICATION_TOPICS: topic name for notification messages
  - MONGODB_URI: MONGODB_URI: Mongodb connection URL


what can be done to improve

- Unit test
- Error handling
- Bulk notification
- Cronjob to resend scheduled messages