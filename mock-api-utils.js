const fs = require('fs');
const csv = require("csvtojson");

const loadResponseDataAsJSON = async (dataDir, url, query = {}) => {
  const fileName = getFileNameFromReq(url, query, 'csv');
  try {
    console.log('...🚀', `${dataDir}/${fileName}...`);
    return await
    csv()
    .fromFile(`${dataDir}/${fileName}`)
  } catch (e) {
    console.log('...💀', `${e}\n`);
    return null;
  }
}

const loadResponseData = (dataDir, url, query = {}) => {
  const fileName = getFileNameFromReq(url, query, 'json');
  try {
    console.log('...🚀', `${fileName}...`);
    return fs.readFileSync(`${dataDir}/${fileName}`);
  } catch (e) {
    console.log('...💀', `${e}\n`);
    return null;
  }
}

const getFileNameFromReq = (url, query = {}, ext) => {
  const baseUrl = url.indexOf('?') !== -1 ? url.substring(0, url.indexOf('?')) : url;
  const responseFileName = `${baseUrl.replace('/', '').replace(/\//g, '_')}.`;

  let filenameQueryFragment = '';
  if (query) {
    Object.keys(query).forEach(
      k => filenameQueryFragment = `${filenameQueryFragment}${k}-${query[k]}.`
    );
  }

  const fileName = `${responseFileName}${filenameQueryFragment}${ext}`;
  return fileName;
}

module.exports = { loadResponseData, loadResponseDataAsJSON, getFileNameFromReq };
