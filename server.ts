import fastify from 'fastify';
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { getCoursesRoute } from './src/routes/get-course-by-id.ts';
import { getCoursesByIdRoute } from './src/routes/get-courses.ts';
import { createCoursesRoute } from './src/routes/create-course.ts';
import scarlarAPIReference from '@scalar/fastify-api-reference';

const PORT = 3333;
const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API Cursos NodeJS',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(scarlarAPIReference, {
    routePrefix: '/docs',
  });
}

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(getCoursesRoute);
server.register(getCoursesByIdRoute);
server.register(createCoursesRoute);

server.listen({ port: PORT }).then(() => {
  console.log(`HTTP server running...`);
});
