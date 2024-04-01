import dotenv from "dotenv";
dotenv.config();

export const devDatabase = {
  HOST: process.env.POSTGRES_HOST,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DB: process.env.POSTGRES_DB,
  DIALECT: "postgres",
};

export const prodDatabase = {
  URL: process.env.STAGE_DB_URL,
  HOST: process.env.STAGE_DB_HOST,
  USER: process.env.STAGE_DB_USER,
  PASSWORD: process.env.STAGE_DB_PASSWORD,
  DB: process.env.STAGE_DB,
  DIALECT: "postgres",
};

export const node = {
  port: process.env.NODE_DOCKER_PORT
};

export const categories = process.env.TETO_CATEGORIES;
export const server_mail = process.env.SERVER_MAIL;
export const server_mail_pass = process.env.SERVER_MAIL_PASS;

export const client = {
  url: process.env.CLIENT_URL,
}

export const server = {
  secret: process.env.SECRET_SALT,
};

export const emailTemplate = (codigoConfirmacion) => {
  return `<!DOCTYPE html>
      <html lang="en" >

        <head>
          <meta charset="UTF-8">
          <title>CodePen - OTP Email Template</title>
        </head>

        <body>
        <!-- partial:index.partial.html -->
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Teto Ropa Colombiana</a>
              </div>
              <p style="font-size:1.1em">Sup,</p>
              <p>Gracias por escoger TETO. Usa el siguiente código para recuperar tu cuenta. El código es valido por 5 minutos</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${codigoConfirmacion}</h2>
              <p style="font-size:0.9em;">Saludos desde,<br />TETO</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Teto</p>
                <p>Ropa</p>
                <p>Colombia</p>
              </div>
            </div>
          </div>
        <!-- partial -->
        </body>
        
      </html>`
};