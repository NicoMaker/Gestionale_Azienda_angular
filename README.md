# Gestionale

Front (**Angular + TypeScript**) + Back (Node.js, Express, SQLite3).

Il backend è invariato: espone solo le API REST sulla porta **3000**. Il frontend è un'app Angular separata (porta **4200** in sviluppo) che chiama `/api/...` tramite proxy.

## Avvio (sviluppo)

```bash
# terminale 1 - backend (porta 3000)
npm install
npm start

# terminale 2 - frontend Angular (porta 4200, proxy /api -> localhost:3000)
cd frontend
npm install
npm start          # http://localhost:4200
```

## Build di produzione

```bash
cd frontend && npm run build     # output in frontend/dist/frontend/browser
```

Servi quella cartella con un qualunque web server statico (nginx, ecc.) inoltrando `/api` a `http://localhost:3000`.

## Struttura

- `backend/`: API REST con `components/` (una cartella per tabella, `dashboard`, `sistema-api`) e `db/database.js` (schema + dati di esempio) - **invariato**
- `frontend/`: app Angular (standalone components, signals, TypeScript strict)
  - `src/app/models/`: interfacce TypeScript delle risposte API
  - `src/app/services/`: `ApiService` (HttpClient), `SchemaService`, `ToastService`, interceptor errori
  - `src/app/components/`: `sidebar`, `data-table`, `modal-form` (Reactive Forms), `toast`
  - `src/app/pages/`: `dashboard`, `entity-page` (pagina generica CRUD per ogni tabella, rotta `:nome`)
  - `proxy.conf.json`: inoltra `/api` al backend
- `docs/`: schema db

Per aggiungere una sezione: una riga in `schema/tabelle.js` (poi `npm run genera`). Il frontend la legge da `/api/schema`: nessuna modifica Angular necessaria.

## 100 tabelle

Lo schema è in `schema/tabelle.js` (10 gruppi × 10 tabelle). Dopo averlo modificato: `npm run genera`
ricrea i componenti `backend/components/<gruppo>/<tabella>/` e gli schemi `docs/schema-db.mmd` e `docs/schema-gruppi.mmd`.
Il frontend Angular legge lo schema da `/api/schema`. Il menu "Scarica backup" scarica una copia del database (`/api/backup`).
