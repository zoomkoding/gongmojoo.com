// robots.js
const fs = require("fs");

const generatedSitemap = `
User-agent: *
Disallow: /[MY_ADMIN_PAGE_DIR]*/
`;

fs.writeFileSync("../public/robots.txt", generatedSitemap, "utf8");
