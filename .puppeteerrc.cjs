const { join } = require('path');

// Keep Chrome for Testing inside the project so builds work without a
// user-level cache (and on CI). Mirrors PUPPETEER_CACHE_DIR used at install.
module.exports = {
  cacheDirectory: join(__dirname, '.puppeteer-cache'),
};
