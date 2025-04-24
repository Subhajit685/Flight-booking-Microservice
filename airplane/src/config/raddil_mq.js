import amqplib from "amqplib";

export const connectMq = async () =>{
    const connection = await amqplib.connect("amqp://localhost")
    const channel = await connection.createChannel()

    await channel.assertQueue("noti", {
        durable: true // make sure it survives broker restarts
    });

    await channel.consume("noti", (data)=>{
        const value = JSON.parse(data.content.toString());
        // console.log(value)
        emailSender(value)
        channel.ack(data);
    })
    await channel.assertQueue("Delnoti", {
        durable: true // make sure it survives broker restarts
    });

    await channel.consume("Delnoti", (data)=>{
        const value = JSON.parse(data.content.toString());
        // console.log(value)
        DelemailSender(value)
        channel.ack(data);
    })
}