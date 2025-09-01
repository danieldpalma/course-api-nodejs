import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts';
import { makeCourse } from '../tests/factories/make-course.ts';

test('Get course by id', async () => {
  await server.ready();

  const course = await makeCourse();

  const response = await request(server.server).get(`/courses/${course.id}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test('Return 404 for non existing course', async () => {
  await server.ready();

  const response = await request(server.server).get(`/courses/52a12554-72b9-416e-9dc7-118aa526df83`);

  expect(response.status).toEqual(404);
});
