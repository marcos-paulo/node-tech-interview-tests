import { createConnection, getConnection } from "typeorm";

createConnection();

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },
};

export default connection;
