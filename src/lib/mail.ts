import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import "server-only";

import { env } from "@root/env.mjs";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedTransporter: Transporter;
}

const init = () => {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number.parseInt(env.SMTP_PORT),
    secure: Boolean(env.SMTP_SECURE),
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });
};

let transporter: Transporter;
if (process.env.NODE_ENV === "production") {
  transporter = init();
} else {
  if (!global.cachedTransporter) {
    global.cachedTransporter = init();
  }
  transporter = global.cachedTransporter;
}

export const mail = transporter;
