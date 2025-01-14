import { EventPayload } from "../../domain/EventPayload";
import prisma from "../prisma/prismaClient";
import {InputJsonValue} from "@prisma/client/runtime/binary";
export const createEventDataRepository = () => {
    const create = async (payload: {
        time: Date,
        name: string,
        data: InputJsonValue
    }): Promise<EventPayload> => {
        return prisma.eventData.create({
            data: payload
        });
    }

    return {create}
}

export const eventDataRepository = createEventDataRepository();
