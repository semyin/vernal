
export const APP_ENV = {
  APP: {
    HOST: import.meta.env.VITE_HOST,
    PORT: import.meta.env.VITE_PORT,
    API_PREFIX: import.meta.env.VITE_API_PREFIX,
    IS_SSR: import.meta.env.SSR,
  },
  DATABASE: {
    HOST: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
    SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE,
    LOGGING: process.env.DATABASE_LOGGING,
  },
  JWT: {
    AUTH_DISABLE: process.env.JWT_AUTH_DISABLE,
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    COOKIE_NAME: process.env.JWT_COOKIE_NAME,
  },
  COS: {
    BUCKET: process.env.TENCENT_COS_BUCKET,
    REGION: process.env.TENCENT_COS_REGION,
    SECRET_ID: process.env.TENCENT_COS_SECRET_ID,
    SECRET_KEY: process.env.TENCENT_COS_SECRET_KEY,
  },
  SITE: {
    URL: process.env.VITE_SITE_URL,
    NAME: process.env.VITE_SITE_NAME,
    DESC: process.env.VITE_SITE_DESC,
    ICP: process.env.VITE_SITE_ICP,
    COPYRIGHT: process.env.VITE_SITE_COPYRIGHT,
  }
}