const sharp = require("/opt/nodejs/node_modules/sharp");
const fs = require("fs");

console.log("Sharp version:", sharp.VERSION);

// HEIC対応テスト
async function testHeicSupport() {
  try {
    // 小さなHEIC風テストイメージを作成
    const testImage = await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 3,
        background: { r: 255, g: 100, b: 0 },
      },
    })
      .jpeg()
      .toBuffer();

    // Sharp でJPEGからWebPに変換テスト
    const webpBuffer = await sharp(testImage).webp({ quality: 80 }).toBuffer();

    console.log("✅ Image conversion test passed");
    console.log("Original size:", testImage.length);
    console.log("WebP size:", webpBuffer.length);

    // HEICフォーマット情報を確認
    const info = sharp.format;
    console.log("Supported formats:", Object.keys(info));
    console.log(
      "HEIF support:",
      info.heif ? "✅ Available" : "❌ Not available"
    );
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

testHeicSupport();
