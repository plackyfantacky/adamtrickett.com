#!/usr/bin/env sh

set -eu

arrow_cloud_directory="./src/lib/arrow-cloud"
output_directory="./public/assets/arrow-cloud"

npm --prefix "$arrow_cloud_directory" run build:labs-runtime

mkdir -p "$output_directory"

cp \
    "$arrow_cloud_directory/dist/arrow-cloud-labs-runtime.js" \
    "$arrow_cloud_directory/dist/arrow-cloud-labs-runtime.js.map" \
    "$output_directory/"