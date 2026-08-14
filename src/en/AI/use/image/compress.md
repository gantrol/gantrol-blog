---
title: Image Compressor
description: Online image compression tool that compresses images to a specified KB size
---

# Image Compressor

> A simple online image compression tool that compresses images to a specified size (default 500KB) and remembers your settings.

## Features

- 🎯 **Precise Compression**: Compress images to under specified KB
- 💾 **Remembers Settings**: Automatically saves your target size preference
- 🖼️ **Live Preview**: Before/after comparison at a glance
- 📊 **Compression Info**: Shows compression ratio and file size changes
- 📱 **Responsive Design**: Supports drag-and-drop, mobile-friendly

## How to Use

1. Set target size (default 500KB)
2. Drag an image to the dashed box, or click to select a file
3. Wait for compression to complete
4. Click to download the compressed image

<script setup>
import ImageCompressor from '../../../../components/ImageCompressor.vue'
</script>

<ImageCompressor />

## Technical Notes

- Uses Canvas API for image processing
- Binary search algorithm finds optimal JPEG quality
- localStorage stores user preferences
- All processing is local, nothing is uploaded to servers
