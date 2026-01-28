const exiftool = require('exiftool-vendored').exiftool;

async function extractTakenAt(filePath, mimeType) {
  try {
    const tags = await exiftool.read(filePath);

    const date =
      tags.DateTimeOriginal ||
      tags.CreateDate ||
      tags.MediaCreateDate ||
      tags.ModifyDate;

    if (!date) return null;

    // exiftool-vendored already gives JS Date
    return new Date(date);
  } catch (err) {
    console.warn('EXIF extraction failed:', err.message);
    return null;
  }
}

process.on('exit', () => {
  exiftool.end();
});

module.exports = { extractTakenAt };
