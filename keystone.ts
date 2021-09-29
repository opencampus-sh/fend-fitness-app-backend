import { config } from '@keystone-next/keystone';
import { statelessSessions } from '@keystone-next/keystone/session';

import { lists } from './schema';
import { withAuth, sessionSecret } from './auth';

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
    url: 'postgres://dbuser:dbpass@localhost:5432/keystone',
    onConnect: async context => { /* ... */ },
    // Optional advanced configuration
    enableLogging: true,
    useMigrations: true,
    idField: { kind: 'uuid' },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
