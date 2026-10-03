# Interactive User Map

A React and TypeScript map that groups user locations into clusters and filters them by interest.

**Stack:** React · TypeScript · Leaflet · React Leaflet · Vite

## Features

- OpenStreetMap tiles with zooming and panning.
- Marker clustering for dense locations.
- Popups with a name and interests.
- Case-insensitive interest filtering using memoized results.
- A script for generating 10,000 synthetic records.

## Run locally

Use Node.js 22.12 or newer within the Node.js 22 series and npm.

```bash
npm ci
npm run dev
```

Open the address printed by Vite.

```bash
npm run build
npm run preview
npm run lint
```

## Data flow

`src/MapComponent.tsx` fetches `public/users.json`. The map uses this static dataset; the `json-server` script is not required for the current UI.

`generateUsers.js` writes a new dataset to the root `users.json`. To display regenerated records, copy that file to `public/users.json`.

## Structure

- `src/MapComponent.tsx` — data loading, filtering, clusters and popups.
- `public/users.json` — browser dataset.
- `generateUsers.js` — synthetic data generator.

## Scope

The project demonstrates map rendering and filtering. Tile and marker-image loading requires internet access. Loading and error feedback, automated tests and large-dataset performance measurement are areas for further work.
