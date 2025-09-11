import type { FastifyRequest, FastifyReply } from 'fastify';
import { getAuthenticatedUserRequest } from '../../utils/get-authenticated-user-from-request.ts';

export function checkUserRole(role: 'student' | 'manager') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = getAuthenticatedUserRequest(request);

    if (user.role != role) {
      return reply.status(401).send();
    }
  };
}
