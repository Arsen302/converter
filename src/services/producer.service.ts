import * as amqp from 'amqplib/callback_api';
import * as express from 'express';

class MessageListner {
  // try writing with callback syntax

  async produce(file: any): Promise<void> {
    await amqp.connect(process.env.AMQP_URL, (err: any, conn: any) => {
      if (err) {
        console.error('We have a problem with connection...', err);
      }
      console.log('[x] Connection created...');

      conn.createChannel((err: any, ch: any) => {
        if (err) {
          console.error('We have a problem with creating channel...', err);
        }
        console.log('[x] Channel created...');

        const queue = 'data_queue';
        const image = file;

        ch.assertQueue(queue, {
          durable: false,
        });

        ch.sendToQueue(queue, Buffer.from(JSON.stringify(image)), {
          persistent: true,
        });
        console.log('[x] Sent', JSON.stringify(image));

        setTimeout(() => {
          conn.close();
          console.log('[x] Closing rabbitmq channel');
          process.exit(0);
        }, 500);
      });
    });

    // try writing with async/await syntax

    //   try {
    //   const conn = await amqp.connect('amqp://localhost:5672', conn: any);
    //   console.log('[x] Connection created...');

    //   const ch = await conn.createChannel()
    //   console.log('[x] Channel created...');

    //   const queue = 'data_queue';
    //   const data = file.file_path;

    //   ch.assertQueue(queue, {
    //     durable: false,
    //   });

    //   ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
    //     persistent: true,
    //   });

    //   console.log('[x] Sent', data);

    //   setTimeout(() => {
    //     conn.close();
    //     console.log('[x] Closing rabbitmq channel');
    //     process.exit(0);
    //   }, 500);
    // }
  }
}

export default new MessageBroker();
