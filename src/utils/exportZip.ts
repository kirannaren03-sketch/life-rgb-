import JSZip from 'jszip';

// Source files bundled as raw text. Loaded lazily so they only download
// when the user actually requests an export.
const sourceFiles = import.meta.glob(
  [
    '/src/**/*.{ts,tsx,css}',
    '/index.html',
    '/package.json',
    '/tsconfig.json',
    '/vite.config.ts',
    '/metadata.json',
    '/README.md',
    '/scripts/*.mjs',
  ],
  { query: '?raw', import: 'default' },
) as Record<string, () => Promise<string>>;

// Static assets served from /public; fetched at export time as binary.
const PUBLIC_ASSETS = [
  'apple-touch-icon.png',
  'favicon.ico',
  'icon.svg',
  'pwa-192x192.png',
  'pwa-512x512.png',
  'pwa-maskable-512x512.png',
];

export async function buildProjectZip(): Promise<Blob> {
  const zip = new JSZip();

  await Promise.all(
    Object.entries(sourceFiles).map(async ([path, load]) => {
      const content = await load();
      zip.file(path.replace(/^\//, ''), content);
    }),
  );

  await Promise.all(
    PUBLIC_ASSETS.map(async (name) => {
      try {
        const res = await fetch(`/${name}`);
        if (res.ok) zip.file(`public/${name}`, await res.blob());
      } catch {
        // Skip assets that can't be fetched (e.g. offline).
      }
    }),
  );

  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
}

export async function downloadProjectZip(filename = 'project.zip'): Promise<void> {
  const blob = await buildProjectZip();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
