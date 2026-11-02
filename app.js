const arabic = document.querySelector('#arabic');
const translation = document.querySelector('#translation');
const reference = document.querySelector('#reference');
const card = document.querySelector('.ayah-card');
const button = document.querySelector('#new-ayah');
const share = document.querySelector('#share');
const status = document.querySelector('#status');
const tafsir = document.querySelector('#tafsir');
let current = null;

async function loadTafsir(surah, ayah) {
  tafsir.textContent = 'جارٍ تحميل التفسير…';
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ar.muyassar`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Tafsir service unavailable');
    const payload = await response.json();
    if (!payload.data?.text) throw new Error('No tafsir returned');
    tafsir.textContent = payload.data.text;
  } catch (_) { tafsir.textContent = 'تعذّر تحميل التفسير حالياً.'; }
}

async function loadAyah() {
  button.disabled = true;
  share.disabled = true;
  card.setAttribute('aria-busy', 'true');
  status.textContent = '';
  try {
    const response = await fetch('https://api.alquran.cloud/v1/ayah/random/editions/quran-uthmani,en.sahih', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not reach the Quran service.');
    const payload = await response.json();
    const [ar, en] = payload.data;
    current = { arabic: ar.text, translation: en.text, reference: `${ar.surah.englishName} · ${ar.surah.number}:${ar.numberInSurah}` };
    arabic.textContent = current.arabic;
    translation.textContent = `“${current.translation}”`;
    reference.textContent = current.reference;
    share.disabled = false;
    loadTafsir(ar.surah.number, ar.numberInSurah);
  } catch (error) {
    status.textContent = 'Unable to load an āyah. Check your connection and try again.';
    if (!current) { arabic.textContent = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'; translation.textContent = '“In the name of Allah, the Most Gracious, the Most Merciful.”'; reference.textContent = 'Al-Fatihah · 1:1'; }
  } finally {
    button.disabled = false;
    card.setAttribute('aria-busy', 'false');
  }
}

button.addEventListener('click', loadAyah);
function wrapText(context, text, maxWidth) {
  const words = text.split(' '); const lines = []; let line = '';
  words.forEach(word => { const next = line ? `${line} ${word}` : word; if (context.measureText(next).width > maxWidth && line) { lines.push(line); line = word; } else line = next; });
  if (line) lines.push(line);
  return lines;
}

async function ayahImage() {
  await document.fonts.ready;
  const canvas = document.createElement('canvas'); canvas.width = 1600; canvas.height = 2000;
  const context = canvas.getContext('2d');
  context.fillStyle = '#f8f5ed'; context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#d9d2c1'; context.lineWidth = 3; context.strokeRect(80, 80, 1440, 1840);
  context.textAlign = 'center'; context.fillStyle = '#c99d52'; context.font = '46px "DM Sans", sans-serif'; context.fillText('✦', 800, 210);
  context.fillStyle = '#6c7973'; context.font = '600 27px "DM Sans", sans-serif'; context.letterSpacing = '4px'; context.fillText('A MOMENT WITH THE QUR’AN', 800, 300); context.letterSpacing = '0px';
  context.fillStyle = '#14322d'; context.font = '500 96px "Noto Naskh Arabic", serif'; context.direction = 'rtl';
  const arLines = wrapText(context, current.arabic, 1190); let y = 490;
  arLines.forEach(line => { context.fillText(line, 800, y); y += 170; });
  y += 30; context.fillStyle = '#c99d52'; context.fillRect(740, y, 120, 4); y += 125;
  context.direction = 'ltr'; context.fillStyle = '#465550'; context.font = '500 45px "Playfair Display", serif';
  const enLines = wrapText(context, `“${current.translation}”`, 1170);
  enLines.forEach(line => { context.fillText(line, 800, y); y += 72; });
  y += 72; context.fillStyle = '#c99d52'; context.font = '600 27px "DM Sans", sans-serif'; context.fillText(current.reference.toUpperCase(), 800, y);
  context.fillStyle = '#6c7973'; context.font = '24px "DM Sans", sans-serif'; context.fillText('آية | AYAH', 800, 1770);
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

share.addEventListener('click', async () => {
  if (!current) return;
  share.disabled = true; status.textContent = 'Creating your image…';
  try {
    const image = await ayahImage(); if (!image) throw new Error('Image unavailable');
    const file = new File([image], `ayah-${current.reference.replaceAll(/[^a-z0-9]/gi, '-').toLowerCase()}.png`, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) await navigator.share({ title: 'آية | Ayah', files: [file] });
    else { const link = document.createElement('a'); link.href = URL.createObjectURL(file); link.download = file.name; link.click(); URL.revokeObjectURL(link.href); status.textContent = 'Image downloaded.'; }
  } catch (error) { if (error.name !== 'AbortError') status.textContent = 'Could not create the image. Please try again.'; }
  finally { share.disabled = false; }
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js');
loadAyah();
