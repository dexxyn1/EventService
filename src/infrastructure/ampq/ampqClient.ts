import { connect, Connection, Channel } from "amqplib";
import { EventPayload } from "../../domain/EventPayload";

const createAmqpClient = (cloudAmqpUrl: string) => {
    let connection: Connection | null = null;
    let channel: Channel | null = null;

    const startConnection = async () => {
        if (!connection) {
            connection = await connect(`${cloudAmqpUrl}?heartbeat=60`);
            console.log("[AMQP] Connected");

            connection.on("close", () => {
                console.warn("[AMQP] Connection closed. Attempting to reconnect...");
                connection = null;
                channel = null;
                setTimeout(startConnection, 1000); // Reconnect after 1 second
            });

            connection.on("error", (err: Error) => {
                console.error("[AMQP] Connection error:", err.message);
                connection = null;
            });
        }

        if (!channel) {
            channel = await connection.createChannel();
        }

        return channel;
    };

    const publish = async (queue: string, payload: EventPayload): Promise<void> => {
        const channel = await startConnection();
        await channel.assertQueue(queue, { durable: true });
        const payloadString = JSON.stringify(payload.data)
        channel.sendToQueue(queue, Buffer.from(payloadString));
        console.log(`[AMQP] Message published to queue "${queue}": ${payloadString}`);
    };

    const close = async () => {
        if (channel) {
            await channel.close();
            channel = null;
        }
        if (connection) {
            await connection.close();
            connection = null;
        }
        console.log("[AMQP] Connection closed");
    };

    return {
        publish,
        close,
    };
};

export const ampqClient = createAmqpClient(process.env.CLOUDAMQP_URL ? process.env.CLOUDAMQP_URL : "NO_SECRET_KEY")