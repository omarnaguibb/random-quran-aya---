<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0c3b37" />
    <meta
      name="description"
      content="Tafsir Layat brings you a random Qur'an ayah, a clean translation, and a reflective tafsir."
    />
    <link rel="manifest" href="manifest.webmanifest" />
    <link rel="icon" href="icon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="icon-512.png" />
    <link rel="stylesheet" href="styles.css" />
    <title>Tafsir Layat | Qur'an Ayah & Tafsir</title>
  </head>
  <body>
    <main class="app-shell">
      <header class="topbar">
        <div class="brand-mark" aria-hidden="true">✦</div>
        <p class="eyebrow">Daily Qur'an reflection</p>
        <h1>Tafsir Layat</h1>
        <p class="tagline">Random ayah • clear translation • tafsir</p>
      </header>

      <section class="ayah-card" aria-live="polite" aria-busy="true">
        <div class="meta-row">
          <span id="surah-name" class="info-chip">Loading…</span>
          <span id="ayah-number" class="info-chip">Ayah —</span>
        </div>

        <div class="ornament" aria-hidden="true">۞</div>
        <p id="arabic" class="arabic">Loading an ayah…</p>
        <div class="rule"></div>
        <p id="translation" class="translation">Please wait a moment.</p>
        <p id="reference" class="reference"></p>
      </section>

      <details class="tafsir-card">
        <summary>Tafsir <span>Al-Muyassar</span></summary>
        <p id="tafsir" dir="rtl" lang="ar">The tafsir will appear here.</p>
      </details>

      <div class="actions">
        <button id="random-btn" class="primary" type="button">Random ayah</button>
        <button id="today-btn" class="secondary" type="button">Today's ayah</button>
        <button id="copy-btn" class="secondary" type="button">Copy</button>
        <button id="share-btn" class="primary" type="button" disabled>Share</button>
      </div>

      <div class="utility-row">
        <button id="favorite-btn" class="ghost" type="button" aria-pressed="false">Save</button>
      </div>

      <p id="status" class="status" role="status"></p>
      <p class="footnote">Arabic: Uthmani script • English: Sahih International</p>
    </main>

    <script src="app.js"></script>
  </body>
</html>
