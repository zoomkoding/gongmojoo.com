// 필요한 모듈 로드
const axios = require("axios");
const fs = require("fs");
const prettier = require("prettier");

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString();
const DOMAIN = "https://www.ddasang.co.kr";

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });
(async () => {
  try {
    const res = await axios({
      method: "get",
      url: "http://3.35.66.51:3000/gongmo/stock",
    });

    const ids = res.data.map(({ id }) => id);
    console.log(ids);
    const postListSitemap = `
    ${ids
      .map((id) => {
        return `
        <url>
          <loc>${`${DOMAIN}/live/${id}`}</loc>
          <lastmod>${getDate}</lastmod>
        </url>
        <url>
          <loc>${`${DOMAIN}/details/${id}`}</loc>
          <lastmod>${getDate}</lastmod>
        </url>`;
      })
      .join("")}`;

    const generatedSitemap = `
	<?xml version="1.0" encoding="UTF-8"?>
  	<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${postListSitemap}
  </urlset>
`;

    const formattedSitemap = formatted(generatedSitemap);

    fs.writeFileSync(
      "../public/sitemap/sitemap-posts.xml",
      formattedSitemap,
      "utf8"
    );
  } catch (err) {
    throw err;
  }
})();
