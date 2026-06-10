# Lighthouse Runner

This folder contains a reusable Lighthouse runner that can audit:

- a deployed site by URL
- a local project that you start manually
- a local project started by the script

## One-time setup

```powershell
cd tools/lighthouse
npm install
```

## Run against a live site

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\lighthouse\run-lighthouse.ps1 `
  -Url "https://teyesglobal.com" `
  -ProjectRoot "." `
  -OutputDir ".\lighthouse-reports\production"
```

## Run against a local project started by the script

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\lighthouse\run-lighthouse.ps1 `
  -Url "http://127.0.0.1:4173" `
  -ProjectRoot "D:\path\to\project" `
  -StartCommand "npm run preview -- --host 127.0.0.1 --port 4173" `
  -ReadyUrl "http://127.0.0.1:4173" `
  -OutputDir "D:\path\to\project\lighthouse-reports\local"
```

## Run against a local project you already started

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\lighthouse\run-lighthouse.ps1 `
  -Url "http://127.0.0.1:3000" `
  -ProjectRoot "D:\path\to\project" `
  -SkipServer `
  -OutputDir "D:\path\to\project\lighthouse-reports\local"
```

## Notes

- Default mode is `both`, which runs mobile and desktop reports.
- Reports are written as both `.json` and `.html`.
- The script expects Chrome or Edge in the default Windows install paths.
