import {z} from "zod";
import {JsonValue} from "@prisma/client/runtime/binary";
import { jsonValueSchema } from "../common/jsonValueSchema";


export const newEventSchema= z.object({
    name: z.enum([
        "user.message.created"
    ]), // Ensures name is limited to specific eventDataRepository-data names
    data: jsonValueSchema, // Ensures data matches Prisma.JsonValue
});

export type NewEventPayload = {
    name: string,
    data: JsonValue
}
