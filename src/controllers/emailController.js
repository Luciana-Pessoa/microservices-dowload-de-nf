const imaps = require('imap-simple');
const Document = require('../models/Document');
const emailConfig = require('../config/emailConfig');

exports.getDocuments = async (req, res) => {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const host = process.env.HOST;
  const port = process.env.PORT;
  const config = emailConfig(email, password, host, port);

  try {
    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    const searchCriteria = ['UNSEEN'];
    const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'], struct: true };

    const messages = await connection.search(searchCriteria, fetchOptions);

    const attachments = [];

    for (const message of messages) {
      const parts = imaps.getParts(message.attributes.struct);
      for (const part of parts) {
        if (part.disposition && part.disposition.type.toUpperCase() === 'ATTACHMENT' && part.disposition.params.filename.endsWith('.xml')) {
          const partData = await connection.getPartData(message, part);
          attachments.push({
            filename: part.disposition.params.filename,
            content: partData
          });
        }
      }
    }

    const documents = await Promise.all(attachments.map(async (attachment) => {
      const contentFile = attachment.content.toString();
      const document = new Document({
        date: new Date(),
        filename: attachment.filename,
        contentFile
      });
      await document.save();
      return {
        date: document.date,
        filename: document.filename,
        contentFile
      };
    }));

    res.json(documents);

  } catch (error) {
    res.status(500).send(error.toString());
  }
};
