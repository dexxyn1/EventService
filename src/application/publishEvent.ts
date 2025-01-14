import {NewEventPayload} from "../domain/NewEventPayload";
import {eventDataRepository} from "../infrastructure/event-data/eventDataRepository";
import {ampqClient} from "../infrastructure/ampq/ampqClient";
import {InputJsonValue} from "@prisma/client/runtime/binary";
import {eventQueueMap} from "../domain/eventQueueMap";

export const publishEvent = async (payload:NewEventPayload) => {
    const eventData = await eventDataRepository.create({
        ...payload,
        time: new Date(),
        data: payload.data as InputJsonValue
    });
    await ampqClient.publish(eventQueueMap[eventData.name], eventData);
}