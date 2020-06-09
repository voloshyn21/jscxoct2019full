const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {EMAIL_SERVICE, EMAIL_LOGIN, EMAIL_PASSWORD, SITE} = require('../configs');
const htmlTemplates = require('../email-templates');


const mailTransport = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_LOGIN,
    pass: EMAIL_PASSWORD
  }
});

const emailTemplates = new EmailTemplates({
  message: null,
  views: {
    root: path.join(process.cwd(), 'email-templates', 'templates'),
    options: {
      extension: 'ejs'
    }
  },
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.join(process.cwd(), 'email-templates', 'css')
    }
  }
});


module.exports = {
  sendMail: async (userMail, action, context) => {
    const template = htmlTemplates[action];
    const html = await emailTemplates.render(template.templateFileName, {...context, SITE});

    const mailOptions = {
      from: 'Voloshka',
      to: userMail,
      subject: template.subject,
      html
    };

    return mailTransport.sendMail(mailOptions)
  },

};
