export const paymentFailedSubject = 'Payment Failed';
export const paymentSuccededSubject = 'Payment Succeeded';
export const paymentCancelledSubject = 'Payment Cancelled';

export const paymentFailedTemplate = () => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"
    id="m_4345773440991763878bodyTable" style="font-family: Sans-serif">
    <tbody>
      <tr>
        <td align="center" valign="top" id="m_4345773440991763878bodyCell">
          <table border="0" cellpadding="0" cellspacing="0" id="m_4345773440991763878templateContainer">
            <tbody>
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    id="m_4345773440991763878templateHeader" style="text-align: start;">
                    <tbody>
                      <tr>
                        <td valign="top" class="m_4345773440991763878headerLogo" style="
                            width: 100%;
                            padding: 15px 0px;
                            text-align: start;
                          ">
                          <a href="https://weautomate.studio" target="_blank"
                            style="text-decoration: none; font-size: 24px; font-weight: 600; color: #7B2BFE;">
                            AAAS.studio
                          </a>
                        </td>
                        <td valign="top" class="m_4345773440991763878headerContent" nowrap="" style="width: 100%"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="600">
                            <tbody>
                              <tr>
                                <td valign="top" width="600">
                                  <p style="
                                      margin: 20px;
                                      font-size: 24px;
                                      line-height: 24px;
                                      font-weight: 800;
                                    ">
                                  <h2 style="text-align: center; width: 100%; font-size: 32px; ">Payment
                                    Failed</h2>

                                  <div style="width: 100%; display: flex; justify-content: center;">
                                    <img src="cid:myImg" alt="" style="width: 100px;">
                                  </div>
                                  <br />
                                  <h2 style="font-size: 18px;">Hi</h2>
                                  We couldn't process your last payment. Please update your payment method and try again
                                  <br>
                                  <br>
                                  Thanks, <br>
                                  AAAS.studio Team
                                  <br />
                                  <div style="display: flex; justify-content: center; margin-top: 20px;">
                                    <a href="https://weautomate.studio/plans"
                                      style="padding: 10px 30px; background-color: #7B2BFE; color: #fff; text-decoration: none; border-radius: 5px;">
                                      Try Again
                                    </a>
                                  </div>
                                  <br><br>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                              </tr>
                              <tr>
                                <td align="center" valign="top"
                                  class="m_4345773440991763878textContent m_4345773440991763878supportBox" style="
                                    width: 100%;
                                    padding-top: 8px;
                                    padding-bottom: 8px;
                                    border-radius: 20px;
                                  ">
                                  <p style="width: 100%">
                                    If you have any questions please contact us
                                    <a href="mailto:team@aaas.studio" style="color: #2c9ab7" target="_blank">
                                      support@AAAS.studio.com
                                    </a>
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

              <tr style="margin-top: 10px">
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    id="m_4345773440991763878templateFooter">
                    <tbody>
                      <tr>
                        <td align="center" valign="top" style="
                            padding-bottom: 10px;
                            padding-top: 10px;
                            color: #f2f2f2;
                            background-color: #7B2BFE;
                            font-size: 14px;
                            letter-spacing: 0.4px;
                            line-height: 20px;
                            text-align: center;
                          ">
                          Copyright © 2024 AAAS.studio, All rights reserved.<br />

                          <div style="
                              display: flex;
                              align-items: center;
                              width: 100%;
                              justify-content: center;
                              margin-top: 10px;
                            ">
                            <a style="color: #fff;font-weight: 600; margin-right: 10px"
                              href="https://weautomate.studio/terms-of-condition">
                              Terms of Conditions
                            </a>

                            <a style="color: #fff;font-weight: 600; margin-left: 10px"
                              href="https://weautomate.studio/privacy-policy">
                              Privacy policy
                            </a>
                          </div>
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
</body>

</html>
    `
}

export const paymentSuccededTemplate = () => {
    return `
    
    `
}