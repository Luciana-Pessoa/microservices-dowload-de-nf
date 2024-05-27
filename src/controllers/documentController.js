const Document = require('../models/Document');
const { parseStringPromise } = require('xml2js');

exports.getInfoDocument = async (req, res) => {
  const { filename } = req.params;
  const document = await Document.findOne({ filename });

  if (!document) {
    return res.status(404).send('Document not found');
  }

  const parsedXml = await parseStringPromise(document.contentFile);
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

  res.json(info);
};
