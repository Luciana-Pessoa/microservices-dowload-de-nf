// Importação dos módulos necessários
const Document = require('../models/Document');
const { parseStringPromise } = require('xml2js');

// Definição da função getInfoDocument que será exportada
exports.getInfoDocument = async (req, res) => {
  // Recuperação do nome do arquivo a partir dos parâmetros da requisição
  const { filename } = req.params;

  // Busca do documento no banco de dados pelo nome do arquivo
  const document = await Document.findOne({ filename });

  // Verificação se o documento foi encontrado
  if (!document) {
    // Se o documento não foi encontrado, retorna um erro 404
    return res.status(404).send('Document not found');
  }

  // Conversão do conteúdo do arquivo de XML para JSON
  const parsedXml = await parseStringPromise(document.contentFile);

  // Extração das informações relevantes do JSON
  const info = {
    cNF: parsedXml.nfeProc.NFe[0].infNFe[0].$.cNF,
    emitCNPJ: parsedXml.nfeProc.NFe[0].infNFe[0].emit[0].CNPJ[0],
    emitName: parsedXml.nfeProc.NFe[0].infNFe[0].emit[0].xNome[0],
    destCNPJ: parsedXml.nfeProc.NFe[0].infNFe[0].dest[0].CNPJ[0],
    destName: parsedXml.nfeProc.NFe[0].infNFe[0].dest[0].xNome[0],
    products: parsedXml.nfeProc.NFe[0].infNFe[0].det.map(product => ({
      description: product.prod[0].xProd[0],
      weight: product.prod[0].qCom[0]
    }))
  };

  // Envio das informações extraídas como resposta
  res.json(info);
};