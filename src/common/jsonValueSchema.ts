import { JsonValue } from "@prisma/client/runtime/library";
import { z } from "zod";

export const jsonValueSchema: z.ZodType<JsonValue> = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(z.lazy(() => jsonValueSchema)), // Handles arrays of JSON values
    z.record(z.lazy(() => jsonValueSchema)), // Handles objects with JSON values
]);