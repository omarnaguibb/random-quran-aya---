# Āyah

A small installable web app that shows a random Qur'an āyah in Uthmani Arabic with the Sahih International English translation and Arabic Tafsir al-Saadi.

## Use it

Host this folder on any HTTPS static web host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, or your own server), then open it on Android, iPad, macOS, or Windows. Use the browser's **Install app** / **Add to Home Screen** option to install it.

For local testing, from this folder run:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

The app needs an internet connection to retrieve a new random āyah. Its interface remains cached after the first visit.
