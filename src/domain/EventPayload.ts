import {z} from "zod";
import { jsonValueSchema } from "../common/jsonValueSchema";

export const eventSchema = z.object({
    id: z.string(), // Ensures id is a string
    name: z.string(), // Ensures name is limited to specific eventDataRepository-data names
    time: z.date(), // Ensures time is a string
    data: jsonValueSchema,   // Accepts any value for data
});
export type EventPayload = z.infer<typeof eventSchema>;