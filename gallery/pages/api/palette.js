import edgeChromium from 'chrome-aws-lambda'

// Importing Puppeteer core as default otherwise
// it won't function correctly with "launch()"
import puppeteer from 'puppeteer-core'

export default async function fetchPalette (req, res) {
    const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
        }
    : {
        args: [],
        executablePath:
            process.platform === 'win32'
            ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'linux'
            ? '/usr/bin/google-chrome'
            : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        };

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage()

    const url = 'https://artsexperiments.withgoogle.com/artpalette/colors/' + "374121-5d4538-477e92-c0b69e-163a60"

    await page.goto(url, { waitUntil: 'networkidle0' });

    // await page.goto(url, {waitForSelector: '.result-item .loaded'})

    // const html = await page.content();
    // console.log(html);

    // let images = await page.evaluate(() => {
        // const srcs = Array.from(
        //     document.querySelectorAll("div.item-image > img")
        // ).map((image) => image.getAttribute("src"));
        // return srcs;
    // })


    // scrape images
    const els = await page.$$('div.result-item');

    const images = [];

    for (let i = 0; i < els.length; i++) {
        const url = await els[i].$eval('div.item-image > img', i => i.getAttribute('src'));
        // console.log(img);
        const title = await els[i].$eval('a.more-details', a => a.getAttribute('title'));
        // console.log(link);

        images.push({"title": title, "url": url})
    }

    console.log(images)
    return images
  }