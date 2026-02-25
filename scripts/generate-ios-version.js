#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const version = pkg.version;

const outputPath = path.join(__dirname, '../ios/Source/TpayVersion.generated.swift');
const content = `// Auto-generated from package.json — do not edit manually.
let reactNativeTpayVersion: String = "${version}"
`;

fs.writeFileSync(outputPath, content);
console.log(`Generated TpayVersion.generated.swift with version ${version}`);
