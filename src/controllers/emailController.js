// Importação dos módulos necessários
const imaps = require("imap-simple");
const Document = require("../models/Document");
const emailConfig = require("../config/emailConfig");

// Definição da função getDocuments que será exportada
exports.getDocuments = async (req, res) => {
  // Recuperação das informações de configuração do email do ambiente
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const host = process.env.HOST;
  const port = process.env.PORT;
  const config = emailConfig(email, password, host, port);

  try {
    // Conexão com o servidor IMAP e abertura da caixa de entrada
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    // Definição dos critérios de busca e opções de recuperação das mensagens
    const searchCriteria = ["UNSEEN"];
    const fetchOptions = {
      bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"],
      struct: true,
    };

    // Busca das mensagens no servidor IMAP
    const messages = await connection.search(searchCriteria, fetchOptions);

    // Inicialização do array que irá armazenar os anexos
    const attachments = [];

    // Iteração sobre as mensagens para extrair os anexos
    for (const message of messages) {
      const parts = imaps.getParts(message.attributes.struct);
      for (const part of parts) {
        // Verificação se a parte é um anexo e se o arquivo é um .xml
        if (
          part.disposition &&
          part.disposition.type.toUpperCase() === "ATTACHMENT" &&
          part.disposition.params.filename.endsWith(".xml")
        ) {
          // Recuperação dos dados do anexo e adição ao array de anexos
          const partData = await connection.getPartData(message, part);
          attachments.push({
            filename: part.disposition.params.filename,
            content: partData,
          });
        }
      }
    }

    // Criação dos documentos a partir dos anexos e salvamento no banco de dados
    const documents = await Promise.all(
      attachments.map(async (attachment) => {
        const contentFile = attachment.content.toString();
        const document = new Document({
          date: new Date(),
          filename: attachment.filename,
          contentFile,
        });
        await document.save();
        return {
          date: document.date,
          filename: document.filename,
          contentFile,
        };
      })
    );

    // Envio dos documentos como resposta
    res.json(documents);
  } catch (error) {
    // Tratamento de erros
    res.status(500).send(error.toString());
  }
};
