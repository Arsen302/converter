import * as amqp from 'amqplib';

class MessageListner {
  async produce(file: any): Promise<void> {
    try {
      const conn = await amqp.connect(`${process.env.AMQP_URL}`);
      console.log('Connection to rabbitmq created...');

      const ch = await conn.createChannel();
      console.log('Channel created...');

      const queue = 'data_queue';
      const msg = file;

      await ch.assertQueue(queue, { durable: true });

      await ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
        persistent: true,
      });

      console.log('Sent:', msg);

      await ch.close();
      await conn.close();
      console.log('Closing rabbitmq channel...');
      process.exit(0);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new MessageListner();
