#!/usr/bin/env node
'use strict';

// Downloads Tpay.xcframework from the tpay-ios GitHub release into ios/Frameworks.
// The version is read from "tpayIosSdkVersion" in package.json.
// Usage: node scripts/download-ios-sdk.js [version]
//   version - optional, sets "tpayIosSdkVersion" in package.json before downloading

const { execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PACKAGE_JSON = path.join(ROOT_DIR, 'package.json');
const FRAMEWORKS_DIR = path.join(ROOT_DIR, 'ios/Frameworks');

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const newVersion = process.argv[2];
  if (newVersion) {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
    pkg.tpayIosSdkVersion = newVersion;
    fs.writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2) + '\n');
  }

  if (process.platform !== 'darwin') {
    console.log('Skipping Tpay.xcframework download, not running on macOS');
    return;
  }

  const version = JSON.parse(
    fs.readFileSync(PACKAGE_JSON, 'utf8')
  ).tpayIosSdkVersion;
  if (!version) {
    throw new Error(`tpayIosSdkVersion not found in ${PACKAGE_JSON}`);
  }

  fs.rmSync(FRAMEWORKS_DIR, { recursive: true, force: true });

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tpay-ios-'));
  try {
    console.log(`Fetching tpay-ios ${version} manifest`);
    const manifest = (
      await download(
        `https://raw.githubusercontent.com/tpay-com/tpay-ios/${version}/Package.swift`
      )
    ).toString('utf8');
    const zipUrl = manifest.match(/url: *"([^"]+)"/)?.[1];
    const checksum = manifest.match(/checksum: *"([^"]+)"/)?.[1];
    if (!zipUrl || !checksum) {
      throw new Error(
        `url or checksum not found in tpay-ios ${version} Package.swift`
      );
    }

    console.log(`Downloading ${zipUrl}`);
    const zip = await download(zipUrl);
    const actualChecksum = crypto
      .createHash('sha256')
      .update(zip)
      .digest('hex');
    if (actualChecksum !== checksum) {
      throw new Error(
        `checksum mismatch, expected ${checksum}, got ${actualChecksum}`
      );
    }

    const zipPath = path.join(tmpDir, 'Tpay.xcframework.zip');
    fs.writeFileSync(zipPath, zip);
    execFileSync(
      'unzip',
      ['-q', zipPath, 'Precompiled/Tpay.xcframework/*', '-d', tmpDir],
      { stdio: 'inherit' }
    );
    fs.mkdirSync(FRAMEWORKS_DIR, { recursive: true });
    fs.renameSync(
      path.join(tmpDir, 'Precompiled/Tpay.xcframework'),
      path.join(FRAMEWORKS_DIR, 'Tpay.xcframework')
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log(`Tpay.xcframework ${version} saved to ${FRAMEWORKS_DIR}`);
}

main().catch((error) => {
  console.error(`error: ${error.message}`);
  process.exit(1);
});
