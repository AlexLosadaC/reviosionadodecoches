'use strict';
const cheerio = require("cheerio");
const createJsonError = require('../../errors/create-json-error');
const { getHtmlContent } = require('../../repositories/api-repository');

async function getTitularesElPais(req, res) {
  try {
    const url = "https://elpais.com";
    const requestHtml = await getHtmlContent(url);


    const html = requestHtml.data;

    const selector = cheerio.load(html);


    const headlines = selector("h2.c_t");

    const titles = headlines
      .map((i, element) => {
        const href = selector(element).find("a").attr("href");
        const link = href.startsWith("http") ? href : `${url}${href}`;
        return {
          text: selector(element).text().trim(),
          link,
        };
      })
      .get();

    res.status(200);
    res.send({ data: titles });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getTitularesElPais;
