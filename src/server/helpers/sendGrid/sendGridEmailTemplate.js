const sendGridEmailTemplate = (url = '') => `
  <div
    style="
      box-sizing: border-box;
      width: 520px;
      max-width: 600px;
      padding: 30px;
      margin: 0 auto !important;

      font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      font-size: 16px;
      color: #294661;
    "
  >
    <h2 style="margin: 0; margin-bottom: 30px; line-height: 1.5; font-size: 24px">
      Let's verify your email so you can start saving contacts in the 'PhoneBook'
      app.
    </h2>

    <p style="margin: 0; margin-bottom: 30px">
      After redirect to SendGrid api -> it will open a new window at <strong>"${url}"</strong>
    </p>

    <div style="text-align: center">
      <a
        href="${url}"
        target="_blank"
        rel="noopener noreferrer nofollow"
        title="${url}"
        style="
          box-sizing: border-box;
          display: inline-block;
          padding: 12px 45px;

          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          text-decoration: none;

          background-color: #2196f3;
          border-radius: 2px;
        "
      >
        Verify Email
      </a>
    </div>
  </div>
`;

module.exports = sendGridEmailTemplate;
