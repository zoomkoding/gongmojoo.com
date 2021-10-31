const zlib = require("zlib");
// public/sitemap 디렉토리 내부에 sitemap들이 있으므로, 해당 폴더에서 실행합니다.
const dirs = ["../public/sitemap"];
const fs = require("fs");

// 경로에서 xml파일을 찾아 .gz파일로 압축. 같은 경로에 저장됩니다.
dirs.forEach((dir) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".xml") && file !== "sitemap.xml") {
      // gzip
      const fileContents = fs.createReadStream(dir + "/" + file);
      const writeStream = fs.createWriteStream(dir + "/" + file + ".gz");
      const zip = zlib.createGzip();

      fileContents
        .pipe(zip)
        .on("error", (err) => console.error(err))
        .pipe(writeStream)
        .on("error", (err) => console.error(err));
    }
  });
});
