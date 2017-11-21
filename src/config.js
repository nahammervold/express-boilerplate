
export default class Config {
  static get server() {
    return {
      port: process.env.PORT || 3000,
      host: process.env.HOST || 'localhost',
      key: process.env.KEY || './certs/domain.key',
      cert: process.env.CERT || './certs/domain.crt',
    }
  }

  /**
   * @returns {object} Gets the session configuration data
   */
  static get session() {
    return {
      session_secret: process.env.SESSION_SECRET || "someDefaultSecret",
      domain: process.env.DOMAIN || 'example.com',
      cookie_path: process.env.COOKIE_PATH || 'someDefaultPath',
      expiryDate: new Date(Date.now() + (process.env.SESSION_EXPIRE || 1) * 60 * 60 *1000)
    }
  }
};

