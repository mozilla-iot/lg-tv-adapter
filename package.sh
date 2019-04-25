#!/bin/bash

set -e

version=$(grep version package.json | cut -d: -f2 | cut -d\" -f2)

# Clean up from previous releases
rm -rf *.tgz package
rm -f SHA256SUMS

# Put package together
mkdir package
cp -r lib LICENSE package.json *.js package/

# Generate checksums
cd package
sha256sum *.js lib/*.js LICENSE > SHA256SUMS
cd -

# Make the tarball
tar czf "lg-tv-adapter-${version}.tgz" package
