import amqplib from "amqplib";

export const connectMq = async (data) => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("noti");
    channel.sendToQueue("noti", Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error);
  }
};

export const DELconnectMq = async (data) => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("Delnoti");
    channel.sendToQueue("Delnoti", Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error);
  }
};
