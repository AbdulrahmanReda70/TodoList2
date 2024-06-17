import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
    let server = createServer({
        environment,

        models: {
            user: Model,
        },

        routes() {
            this.namespace = 'api';

            this.get('/users', (schema) => {
                return schema.users.all();
            });

            this.post('/users', (schema, request) => {
                let newUser = JSON.parse(request.requestBody);
                schema.users.create(newUser);
                return schema.users.all();
            });
        },

        seeds(server) {
            server.create('user', { id: 1, name: 'User 1', password: 'p123' });
            server.create('user', { id: 2, name: 'User 2', password: 'p123' });
            server.create('user', { id: 3, name: 'User 3', password: 'p123' });
            server.create('user', { id: 4, name: 'User 4', password: 'p123' });
            server.create('user', { id: 5, name: 'User 5', password: 'p123' });
        },
    });

    return server;
}

