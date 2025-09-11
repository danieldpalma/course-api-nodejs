import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts';
import { makeCourse } from '../tests/factories/make-course.ts';
import { makeAuthenticatedUser } from '../tests/factories/make-user.ts';

test('Get course by id', async () => {
  await server.ready();

  const { token } = await makeAuthenticatedUser('student');
  const course = await makeCourse();

  const response = await request(server.server).get(`/courses/${course.id}`).set('Authorization', token);

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

  const { token } = await makeAuthenticatedUser('student');
  const response = await request(server.server).get(`/courses/52a12554-72b9-416e-9dc7-118aa526df83`).set('Authorization', token);

  expect(response.status).toEqual(404);
});
