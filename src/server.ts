import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { createEventRoute } from "./routes/create-event";
import { registerAttendeeForEvent } from "./routes/register-for-event";
import { getEventRoute } from "./routes/get-event";
import { getAttendeeBadgeRoute } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import { errorHandler } from "./error-handler";
import { createAdmRoute } from "./routes/create-adm";

const app = fastify();

app.register(fastifyCors, {
	origin: "*"
})

// add swagger to server
app.register(fastifySwagger, {
	swagger: {
		consumes: ['application/json'],
		produces: ['appplication/json'],
		info: {
			title: 'pass.in',
			description: 'Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unit Da Rocketseat',
			version: '1.0.0'
		},
	},
	transform: jsonSchemaTransform
})

// add swaggerUi to server
app.register(fastifySwaggerUi, {
	routePrefix: '/docs'
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// add routes
app.register(createEventRoute);
app.register(registerAttendeeForEvent);
app.register(getEventRoute);
app.register(getAttendeeBadgeRoute);
app.register(checkIn);
app.register(getEventAttendees);
app.register(createAdmRoute);

app.setErrorHandler(errorHandler);

// server listen
app.listen({ port: 8000, host: '0.0.0.0' }).then(() => {
	console.log("Http server running http:://localhost:8000");
});