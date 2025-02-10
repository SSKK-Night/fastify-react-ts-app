import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: '*'
});

export default fastify;
