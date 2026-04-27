# Cloudinary Setup Guide for Your Portfolio

This guide walks you through setting up Cloudinary to host your photos and videos.

## Why Cloudinary?

- **Free tier:** 25GB/month (perfect for a videographer portfolio)
- **Fast delivery:** Global CDN ensures your content loads quickly
- **Video-friendly:** Supports MP4, WebM, and other formats
- **Easy integration:** Just copy/paste URLs into your code
- **No slowdown:** Your site stays fast because files are hosted externally

## Step 1: Create a Free Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up with your email
3. Verify your email
4. Log in to your Cloudinary dashboard

## Step 2: Get Your Cloud Name

1. In the Cloudinary dashboard, look for your **Cloud Name** (top-left area)
2. It looks like: `abc123xyz` or `your-portfolio`
3. Save this — you'll need it for your URLs

## Step 3: Upload Your Files

### Option A: Upload via Dashboard (Easiest)
1. In Cloudinary, click **Media Library** → **Upload**
2. Drag & drop your photos/videos
3. Wait for upload to complete
4. Click the file to view its **Delivery URL**

### Option B: Upload via Command Line (Faster for bulk)
```bash
# Install Cloudinary CLI (if you want to)
npm install -g cloudinary-cli

# Or use the web interface — it's simpler for getting started
```

## Step 4: Copy Your File URLs

After uploading, Cloudinary gives you a URL like:

```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/my-photo.jpg
https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/my-video.mp4
```

## Step 5: Update Your Portfolio Code

Open `client/src/pages/Home.tsx` and replace the placeholder URLs in the `GALLERY_ITEMS` array:

```javascript
const GALLERY_ITEMS = [
  {
    id: 1,
    type: "image", // or "video"
    src: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/my-photo.jpg",
    thumb: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/my-photo.jpg",
    alt: "My Photo",
    dims: "1920x1080", // width x height of your file
  },
  {
    id: 2,
    type: "video",
    src: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/my-video.mp4",
    thumb: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/video-thumbnail.jpg",
    alt: "My Video",
    dims: "1920x1080",
  },
  // Add more items...
];
```

### Key Fields:
- **`type`**: Set to `"image"` or `"video"`
- **`src`**: Full Cloudinary URL to your file
- **`thumb`**: Thumbnail image (for videos, use a still frame; for images, use the same URL)
- **`dims`**: Original dimensions as `"width x height"` (used for masonry layout)
- **`alt`**: Descriptive text for accessibility

## Step 6: Replace Your Logo

Update the `LOGO_URL` at the top of `Home.tsx`:

```javascript
const LOGO_URL = "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/your-logo.png";
```

## Step 7: Test & Deploy

1. Save your changes
2. Refresh your browser to see your content
3. Click on items to open the lightbox
4. Test video playback

## Tips & Tricks

### Optimize Video File Size
Before uploading to Cloudinary, compress your videos:

```bash
# Using FFmpeg (free tool)
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset fast output.mp4
```

This reduces file size by 50-80% without losing much quality.

### Get Thumbnail from Video
Cloudinary can auto-generate thumbnails:

```
https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/so_0/my-video.mp4
```

Or use a still frame you captured separately.

### Bulk Upload
If you have 50+ files, use Cloudinary's **Bulk Upload** feature in the dashboard for faster uploads.

### Monitor Your Usage
In Cloudinary dashboard → **Settings** → **Usage**, you can see:
- Storage used (out of 25GB free)
- Bandwidth used (out of 25GB free)
- Remaining quota

## Troubleshooting

**Videos not playing?**
- Check the URL is correct (copy from Cloudinary dashboard)
- Ensure the file format is MP4 or WebM
- Try opening the URL directly in your browser

**Images look blurry?**
- Cloudinary auto-optimizes, but you can add quality parameter:
  ```
  https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/q_90/my-photo.jpg
  ```

**Thumbnails not showing?**
- For videos, make sure `thumb` points to an image file (JPG/PNG)
- For images, `thumb` can be the same as `src`

## Next Steps

Once you've set up Cloudinary:

1. **Update your logo** — replace the placeholder with your actual logo
2. **Update navigation labels** — change "circus maximus tour" etc. to your own categories
3. **Add more items** — duplicate items in `GALLERY_ITEMS` and update URLs
4. **Customize colors** — edit `client/src/index.css` to match your brand

## Questions?

- Cloudinary docs: https://cloudinary.com/documentation
- React video guide: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
- Contact Cloudinary support for account issues

Happy uploading! 🎬
