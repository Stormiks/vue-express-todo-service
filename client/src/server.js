import { Server, Model, belongsTo, hasMany, Serializer, RestSerializer, Factory, JSONAPISerializer } from "miragejs"

const ApplicationSerializer = Serializer.extend()

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    serializers: {
      application: JSONAPISerializer,
      reminder: RestSerializer.extend({
        include: ["task"],
        embed: true,
      }),
      factories: Factory.extend({
        text: "Reminder text",
      }),
    },

    environment,

    models: {
      user: Model.extend({
        task: hasMany()
      }),
      task: Model.extend({
        user: belongsTo()
      })
    },

    seeds(server) {
      server.db.loadData({
        tasks: [
          {
            text: "Task 1",
            checked: false
          },
          {
            text: "Task 2",
            checked: false
          },
          {
            text: "Task 3",
            checked: false
          },
          {
            text: "Task 4",
            checked: true
          }
        ],
        users: [
          { login: "Bob", name: "Bob" },
          { login: "Alice", name: "Alice", admin: true, tasksId: 3 }
        ]
      });
    },

    routes() {
      this.namespace = "api"

      this.get("/users", (schema) => {
        return schema.users.all()
      })

      this.post('/register', (schema, req) => {
        const attrs = JSON.parse(req.requestBody)

        const user = schema.users.create({ login: attrs.login, name: attrs.login })

        console.log(user.attrs);

        return {
          msg: 'Success!',
          user
        }
      })

      this.post('/login', (schema, req) => {
        const attrs = JSON.parse(req.requestBody)
        const user = schema.users.findBy({ login: attrs.login })

        console.log(user);

        if (!user) {
          return {
            error: 'Invalid login details'
          }
        } else {
          return {
            msg: 'Success!',
            user
          }
        }
      })

      this.get('/tasks', ({ db }) => {
        return db.tasks
      })

      this.post('/tasks/add', (schema, req) => {
        console.log('tasks');
        console.log(req.requestBody);
      })
    },
  })

  return server
}