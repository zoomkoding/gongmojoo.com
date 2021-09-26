// robots.js
const fs = require("fs");

const generatedSitemap = `
User-agent: *
Sitemap: https://www.ddasang.co.kr/sitemap.xml
Host: https://www.ddasang.co.kr
`;

fs.writeFileSync("../public/robots.txt", generatedSitemap, "utf8");
