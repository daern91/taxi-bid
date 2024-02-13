const getPathDependentOptions = () => {
  return {
    entities: [`${__dirname}/src/data-models/**/*.ts`],
  };
};

const host = process.env.PGHOST || "localhost";
const port = process.env.PGPORT || 5432;

const { entities } = getPathDependentOptions();

const baseOptions = {
  entities,
  host,
  port,
  logging: false,
  password: "asdf1234",
  type: "postgres",
  username: "postgres",
  autoLoadEntities: true,
};

module.exports = [
  Object.assign({}, baseOptions, { name: "taxi-db", database: "taxi-db" }),
];
