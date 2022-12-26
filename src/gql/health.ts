export const healthDef = `#graphql
  type Health {
    env: String
    version: String
  }
  extend type Query {
    health: Health
  }
`;

interface Health {
  env: string;
  version: string;
}

export const healthRes = {
  Query: {
    health: () =>
      ({
        env: process.env.NODE_ENV,
        version: process.env.APP_VERSION,
      } as Health),
  },
};

export const HEALTH = `#graphql
  query health {
    health {
      env
      version
    }
  }
`;
