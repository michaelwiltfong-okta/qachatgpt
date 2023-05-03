import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import formidable from 'formidable';
import puppeteer from 'puppeteer';
import type { NextApiRequest, NextApiResponse } from 'next';
import { runIngestData } from '@/utils/ingest-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== `POST`) {
    return res.status(405).send(`Invalid method`);
  }

  const form = formidable({
    encoding: `utf-8`,
    multiples: true,
  });

  const formData = await new Promise<{ links: string[], pdfs: formidable.File[] }>((resolve, reject) => {
    form.parse(req, async (error, fields, files) => {
      if (error) {
        console.error(error);
        reject(`Something went wrong parsing the files`);
      }

      resolve({
        links: (fields[`links`] as string).split(`,`).map(link => link.trim()).filter(Boolean),
        pdfs: Object.values(files).flat().filter(file => file.size > 0),
      });
    });
  });

  const pathToDocs = path.join(process.cwd(), `docs`);
  const fileNames: Array<string> = [];

  if (formData.links.length === 0 && formData.pdfs.length === 0) {
    return res.status(422).send(`Unprocessable input`);
  }

  if (formData.links) {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });

    const formattedLinks = formData.links.map(
      (link: string) => link.startsWith(`http`) ? link : `http://${link}`
    );

    const htmlFiles = await Promise.all(
      formattedLinks.map(async (formattedLink) => {
        const page = await browser.newPage();

        await page.goto(formattedLink, {
          waitUntil: `domcontentloaded`,
        });
      
        const content = await page.content();

        await page.close();

        return content;
      })
    );

    await browser.close();
  
    fileNames.push(...await Promise.all(htmlFiles.map(
      async (htmlFile, index) => {
        const fileName = `${index}.html`;
        await fs.writeFile(`${pathToDocs}/${fileName}`, htmlFile, { encoding: `utf8` });
        return fileName;
      }
    )));
  }

  if (formData.pdfs) {
    fileNames.push(...await Promise.all(formData.pdfs.map(
      async (pdf, index) => {
        const oldPath = pdf.filepath;
        const newFileName = `${index}.pdf`;
        const newPath = `${pathToDocs}/${newFileName}`;
        await fs.rename(oldPath, newPath);
        return newFileName;
      })
    ));
  }
    
  const namespace = randomUUID();

  await runIngestData(namespace);

  await Promise.all(
    fileNames.map(fileName => fs.unlink(`${pathToDocs}/${fileName}`))
  );

  res.status(200).send(namespace);
}