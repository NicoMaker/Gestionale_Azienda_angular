// Tipi che descrivono le risposte delle API del backend (invariato)

export type TipoCampo = 'text' | 'email' | 'number' | 'date' | 'select';

export interface Campo {
  k: string;
  l: string;
  type: TipoCampo;
  req: boolean;
  /** tabella referenziata (chiave esterna) */
  da?: string;
  /** valori ammessi per i campi a scelta fissa */
  opzioni?: string[];
  step?: string;
}

export interface Colonna {
  k: string;
  l: string;
  fmt?: 'euro' | 'badge';
}

export interface Tabella {
  nome: string;
  titolo: string;
  label: string;
  colonne: Colonna[];
  campi: Campo[];
}

export interface Gruppo {
  id: string;
  titolo: string;
  icona: string;
  tabelle: Tabella[];
}

/** Tabella arricchita con i dati del gruppo, come ENTITIES nel front originale */
export interface Entita extends Tabella {
  gruppo: string;
  icona: string;
  singolare: string;
}

/** Riga restituita da GET /api/<tabella> (colonne + etichette dei join) */
export type Riga = { id: number } & Record<string, string | number | null>;

/** Valori inviati con POST / PUT */
export type Valori = Record<string, string | number | null>;

/** [id, etichetta] per i menu a tendina delle chiavi esterne */
export type Opzioni = Record<string, [number, string][]>;

export interface StatoFattura {
  stato: string;
  n: number;
  /** SUM() del backend: null se non ci sono importi */
  tot: number | null;
}

export interface DashboardStats {
  clienti: number;
  prodotti: number;
  fatture: number;
  fatturato: number;
  incassato: number;
  perStato: StatoFattura[];
}
