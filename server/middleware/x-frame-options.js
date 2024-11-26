import { defineEventHandler, setHeader } from 'h3';

export default defineEventHandler((event) => {
  // Set the X-Frame-Options header
  setHeader(event, 'X-Frame-Options', 'ALLOW-FROM https://app.storyblok.com');

  // Set the Content-Security-Policy header for iframe embedding
  setHeader(
    event,
    'Content-Security-Policy',
    "frame-ancestors 'self' https://app.storyblok.com"
  );
});
