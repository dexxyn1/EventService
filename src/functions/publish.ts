import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import {newEventSchema} from "../domain/NewEventPayload";
import {publishEvent} from "../application/publishEvent";
import {HttpResult} from "../common/httpResultUtils";
import {toErrorResult} from "../common/resultUtils";
import {formatZodErrorsToString} from "../common/validationUtils";

export async function publish(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // Parse the request body as JSON
    const body = await request.json();
    const validationResult = newEventSchema.safeParse(body);
    if (!validationResult.success) {
        const errorMessage = formatZodErrorsToString(validationResult.error.errors);
        const errorResult = toErrorResult("ValidationError", errorMessage);
        return HttpResult.BadRequest(errorResult)
    }
    await publishEvent(validationResult.data)
    return HttpResult.Accepted();
}

app.http('publish', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: publish
});