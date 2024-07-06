"use strict";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(from: any, token: any) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "team@aaas.studio", // generated ethereal user
      pass: "gntg impq qlow znmg",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Your Confirmation Code"', // sender address
    to: from, // list of receivers
    subject: "Your Confirmation Code | Hackathon Winner", // Subject line
    text: "Please verify your email address", // plain text body
    html: `<div
    style="
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';
      background-color: #ffffff;
      color: #718096;
      height: 100%;
      line-height: 1.4;
      margin: 0;
      padding: 0;
      width: 100% !important;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
        background-color: #edf2f7;
        margin: 0;
        padding: 0;
        width: 100%;
      "
    >
      <tbody>
        <tr>
          <td
            align="center"
            style="
              box-sizing: border-box;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                'Segoe UI Emoji', 'Segoe UI Symbol';
            "
          >
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                  Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                  'Segoe UI Emoji', 'Segoe UI Symbol';
                margin: 0;
                padding: 0;
                width: 100%;
              "
            >
              <tbody>
                <tr>
                  <td
                    style="
                      box-sizing: border-box;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                        'Segoe UI Emoji', 'Segoe UI Symbol';
                      padding: 25px 0;
                      text-align: center;
                    "
                  >
                    <a
                      href="https://hackathon-nine-silk.vercel.app/"
                      style="
                        box-sizing: border-box;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                          Roboto, Helvetica, Arial, sans-serif,
                          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                        color: #3d4852;
                        font-size: 19px;
                        font-weight: bold;
                        text-decoration: none;
                        display: inline-block;
                      "
                      target="_blank"
                      data-saferedirecturl="https://hackathon-nine-silk.vercel.app/"
                    >
                      Hackathon
                    </a>
                  </td>
                </tr>
  
                <tr>
                  <td
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      box-sizing: border-box;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                        'Segoe UI Emoji', 'Segoe UI Symbol';
                      background-color: #edf2f7;
                      border-bottom: 1px solid #edf2f7;
                      border-top: 1px solid #edf2f7;
                      margin: 0;
                      padding: 0;
                      width: 100%;
                      border: hidden !important;
                    "
                  >
                    <table
                      class="m_4241206958953497174inner-body"
                      align="center"
                      width="570"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        box-sizing: border-box;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                          Roboto, Helvetica, Arial, sans-serif,
                          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                        background-color: #ffffff;
                        border-color: #e8e5ef;
                        border-radius: 2px;
                        border-width: 1px;
                        margin: 0 auto;
                        padding: 0;
                        width: 570px;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              max-width: 100vw;
                              padding: 32px;
                            "
                          >
                            <p
                              style="
                                box-sizing: border-box;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                  'Apple Color Emoji', 'Segoe UI Emoji',
                                  'Segoe UI Symbol';
                                font-size: 16px;
                                line-height: 1.5em;
                                margin-top: 0;
                                text-align: left;
                              "
                            >
                              Use this link to securely log in:
                            </p>
                            <table
                              align="center"
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                box-sizing: border-box;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                  'Apple Color Emoji', 'Segoe UI Emoji',
                                  'Segoe UI Symbol';
                                margin: 30px auto;
                                padding: 0;
                                text-align: center;
                                width: 100%;
                              "
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      box-sizing: border-box;
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Helvetica, Arial, sans-serif,
                                        'Apple Color Emoji', 'Segoe UI Emoji',
                                        'Segoe UI Symbol';
                                    "
                                  >
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        box-sizing: border-box;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', Roboto,
                                          Helvetica, Arial, sans-serif,
                                          'Apple Color Emoji', 'Segoe UI Emoji',
                                          'Segoe UI Symbol';
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              box-sizing: border-box;
                                              font-family: -apple-system,
                                                BlinkMacSystemFont, 'Segoe UI',
                                                Roboto, Helvetica, Arial,
                                                sans-serif, 'Apple Color Emoji',
                                                'Segoe UI Emoji',
                                                'Segoe UI Symbol';
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                box-sizing: border-box;
                                                font-family: -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  Roboto, Helvetica, Arial,
                                                  sans-serif, 'Apple Color Emoji',
                                                  'Segoe UI Emoji',
                                                  'Segoe UI Symbol';
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      box-sizing: border-box;
                                                      font-family: -apple-system,
                                                        BlinkMacSystemFont,
                                                        'Segoe UI', Roboto,
                                                        Helvetica, Arial,
                                                        sans-serif,
                                                        'Apple Color Emoji',
                                                        'Segoe UI Emoji',
                                                        'Segoe UI Symbol';
                                                    "
                                                  >
                                                    <a
                                                      href="https://hackathon-nine-silk.vercel.app/password?token=${token}"
                                                      class="m_4241206958953497174button"
                                                      rel="noopener"
                                                      style="
                                                        box-sizing: border-box;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Roboto,
                                                          Helvetica, Arial,
                                                          sans-serif,
                                                          'Apple Color Emoji',
                                                          'Segoe UI Emoji',
                                                          'Segoe UI Symbol';
                                                        border-radius: 4px;
                                                        color: #fff;
                                                        display: inline-block;
                                                        overflow: hidden;
                                                        text-decoration: none;
                                                        background-color: #2d3748;
                                                        border-bottom: 8px solid
                                                          #2d3748;
                                                        border-left: 18px solid
                                                          #2d3748;
                                                        border-right: 18px solid
                                                          #2d3748;
                                                        border-top: 8px solid
                                                          #2d3748;
                                                      "
                                                      target="_blank"
                                                      data-saferedirecturl="https://hackathon-nine-silk.vercel.app/password?token=${token}"
                                                      >Log in</a
                                                    >
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p
                              style="
                                box-sizing: border-box;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                  'Apple Color Emoji', 'Segoe UI Emoji',
                                  'Segoe UI Symbol';
                                font-size: 16px;
                                line-height: 1.5em;
                                margin-top: 0;
                                text-align: left;
                              "
                            >
                              Regards,<br />
                              Hackathon Winner
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
  
                <tr>
                  <td
                    style="
                      box-sizing: border-box;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                        'Segoe UI Emoji', 'Segoe UI Symbol';
                    "
                  >
                    <table
                      class="m_4241206958953497174footer"
                      align="center"
                      width="570"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        box-sizing: border-box;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                          Roboto, Helvetica, Arial, sans-serif,
                          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                        margin: 0 auto;
                        padding: 0;
                        text-align: center;
                        width: 570px;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              max-width: 100vw;
                              padding: 32px;
                            "
                          >
                            <p
                              style="
                                box-sizing: border-box;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                  'Apple Color Emoji', 'Segoe UI Emoji',
                                  'Segoe UI Symbol';
                                line-height: 1.5em;
                                margin-top: 0;
                                color: #b0adc5;
                                font-size: 12px;
                                text-align: center;
                              "
                            >
                              © 2024 Hackathon Winner. All rights reserved.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="yj6qo"></div>
    <div class="adL"></div>
  </div>
  
  </table>
  `, // html body
  });
}
