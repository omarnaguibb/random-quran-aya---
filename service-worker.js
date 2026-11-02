# Tafsir Layat

A refined installable Qur'an app that shows a random ayah with a clean English translation and an Arabic tafsir panel. It is designed for daily reflection, simple sharing, and a calmer reading experience.

## Recommended app identity

- App name: Tafsir Layat
- GitHub repository name suggestion: `tafsir-layat`
- GitHub Pages URL example: `https://<your-user>.github.io/tafsir-layat/`

This gives the app a cleaner, more memorable name and a better URL than the original random repo name.

## Features

- Random Qur'an ayah
- Daily ayah option
- Arabic text with English translation
- Tafsir panel using the Al-Muyassar service
- Copy ayah to clipboard
- Share as an image
- Save favorites in the browser
- Installable PWA experience

## Run locally

From the project folder, run:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

The app uses live Qur'an data from the alquran.cloud API, so an internet connection is required for fresh verses and tafsir.

## Project note

If you want the repository itself renamed on GitHub, you can rename it in the repo settings or create a new repo with the final name and move the code there.
