// robots.js
const fs = require("fs");

const generatedSitemap = `
User-agent: *
Sitemap: https://www.gongmojoo.com/sitemap.xml
Host: https://www.gongmojoo.com
`;

fs.writeFileSync("../public/robots.txt", generatedSitemap, "utf8");
