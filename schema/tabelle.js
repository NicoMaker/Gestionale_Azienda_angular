// Unica fonte dello schema: 10 gruppi x 10 tabelle = 100 tabelle.
// Sintassi campo: nome* (testo obbligatorio) · @ email · # intero · € importo · ~ data
//                 campo_id>tabella (chiave esterna) · campo[a|b|c] (scelta)
module.exports = {
  anagrafiche: {
    titolo: "Anagrafiche",
    icona: "👥",
    tabelle: `
clienti: nome*,email@,telefono,citta
fornitori: nome*,email@,telefono,piva
contatti: nome*,email@,telefono,cliente_id>clienti
agenti: nome*,email@,provvigione#
categorie_clienti: nome*,sconto#
zone: nome*,regione
nazioni: nome*,codice,prefisso
valute: codice*,nome,simbolo
banche: nome*,abi,citta
settori: nome*,descrizione`,
  },
  vendite: {
    titolo: "Vendite",
    icona: "🧾",
    tabelle: `
fatture: cliente_id>clienti,data~,importo€,stato[bozza|emessa|pagata]
preventivi: numero*,cliente_id>clienti,data~,importo€,stato[aperto|accettato|rifiutato]
ordini_clienti: numero*,cliente_id>clienti,data~,importo€,stato[nuovo|evaso|annullato]
note_credito: numero*,cliente_id>clienti,data~,importo€
spedizioni: tracking*,cliente_id>clienti,data~,corriere,stato[preparazione|in_viaggio|consegnata]
resi: motivo*,cliente_id>clienti,data~,importo€
listini: nome*,valuta,valido_dal~,valido_al~
sconti: nome*,percentuale#,valido_dal~,valido_al~
promozioni: nome*,descrizione,inizio~,fine~
contratti: titolo*,cliente_id>clienti,inizio~,fine~,valore€`,
  },
  acquisti: {
    titolo: "Acquisti",
    icona: "🛒",
    tabelle: `
ordini_fornitori: numero*,fornitore_id>fornitori,data~,importo€,stato[nuovo|ricevuto|annullato]
fatture_acquisto: numero*,fornitore_id>fornitori,data~,importo€,stato[da_pagare|pagata]
richieste_offerta: oggetto*,fornitore_id>fornitori,data~
ddt_ingresso: numero*,fornitore_id>fornitori,data~
note_debito: numero*,fornitore_id>fornitori,data~,importo€
listini_acquisto: nome*,fornitore_id>fornitori,valido_dal~
valutazioni_fornitori: fornitore_id>fornitori,punteggio#,note
budget_acquisti: nome*,anno#,importo€
approvazioni: oggetto*,richiedente,stato[in_attesa|approvata|respinta]
spese_acquisto: descrizione*,fornitore_id>fornitori,data~,importo€`,
  },
  magazzino: {
    titolo: "Magazzino",
    icona: "📦",
    tabelle: `
prodotti: nome*,prezzo€,giacenza#,categoria_id>categorie_prodotti
categorie_prodotti: nome*,descrizione
marche: nome*,paese
magazzini: nome*,citta,capienza#
giacenze: prodotto_id>prodotti,magazzino_id>magazzini,quantita#
movimenti_magazzino: prodotto_id>prodotti,data~,quantita#,tipo[carico|scarico]
lotti: codice*,prodotto_id>prodotti,scadenza~
inventari: nome*,magazzino_id>magazzini,data~
unita_misura: nome*,sigla
ubicazioni: codice*,magazzino_id>magazzini`,
  },
  contabilita: {
    titolo: "Contabilità",
    icona: "📒",
    tabelle: `
piano_conti: codice*,nome,tipo[attivo|passivo|costo|ricavo]
registrazioni: descrizione*,data~,importo€,conto_id>piano_conti
iva: nome*,aliquota#
cespiti: nome*,acquisto~,valore€
ammortamenti: cespite_id>cespiti,anno#,importo€
centri_costo: codice*,nome
scadenzario: descrizione*,scadenza~,importo€,stato[aperta|saldata]
riconciliazioni: descrizione*,data~,importo€
bilanci: nome*,anno#,utile€
esercizi: nome*,inizio~,fine~`,
  },
  finanza: {
    titolo: "Finanza",
    icona: "💶",
    tabelle: `
conti_bancari: nome*,iban,banca_id>banche,saldo€
movimenti_bancari: descrizione*,conto_id>conti_bancari,data~,importo€
pagamenti: descrizione*,data~,importo€,metodo[bonifico|carta|contanti]
incassi: descrizione*,cliente_id>clienti,data~,importo€
prestiti: nome*,capitale€,tasso#,durata_mesi#
investimenti: nome*,data~,importo€,rendimento#
titoli: nome*,isin,prezzo€
dividendi: titolo_id>titoli,data~,importo€
previsioni_cassa: mese*,entrate€,uscite€
tassi_cambio: valuta*,data~,tasso€`,
  },
  personale: {
    titolo: "Personale",
    icona: "🧑‍💼",
    tabelle: `
dipendenti: nome*,email@,reparto_id>reparti,ruolo_id>ruoli
reparti: nome*,responsabile
ruoli: nome*,livello#
contratti_lavoro: dipendente_id>dipendenti,inizio~,fine~,ral€
presenze: dipendente_id>dipendenti,data~,ore#
ferie: dipendente_id>dipendenti,dal~,al~,stato[richieste|approvate|respinte]
buste_paga: dipendente_id>dipendenti,mese*,lordo€,netto€
formazione: corso*,dipendente_id>dipendenti,data~,ore#
selezioni: candidato*,email@,posizione,stato[nuovo|colloquio|assunto|scartato]
valutazioni_personale: dipendente_id>dipendenti,anno#,punteggio#,note`,
  },
  progetti: {
    titolo: "Progetti",
    icona: "🗂️",
    tabelle: `
progetti: nome*,cliente_id>clienti,inizio~,fine~,budget€,stato[attivo|sospeso|chiuso]
attivita: titolo*,progetto_id>progetti,scadenza~,stato[da_fare|in_corso|fatta]
milestone: nome*,progetto_id>progetti,data~
risorse: nome*,ruolo,costo_orario€
timesheet: progetto_id>progetti,risorsa_id>risorse,data~,ore#
spese_progetto: descrizione*,progetto_id>progetti,importo€
rischi: descrizione*,progetto_id>progetti,gravita[bassa|media|alta]
documenti_progetto: titolo*,progetto_id>progetti,data~
versioni: nome*,progetto_id>progetti,data~
rilasci: nome*,versione_id>versioni,data~,note`,
  },
  assistenza: {
    titolo: "Assistenza",
    icona: "🛠️",
    tabelle: `
ticket: oggetto*,cliente_id>clienti,priorita[bassa|media|alta],stato[aperto|in_corso|chiuso]
interventi: descrizione*,ticket_id>ticket,tecnico_id>tecnici,data~,ore#
garanzie: prodotto_id>prodotti,cliente_id>clienti,scadenza~
richieste: oggetto*,cliente_id>clienti,data~
faq: domanda*,risposta
canali: nome*,tipo[email|telefono|chat]
sla: nome*,ore_risposta#,ore_risoluzione#
feedback: cliente_id>clienti,voto#,commento
tecnici: nome*,email@,specialita
ricambi: nome*,codice,prezzo€,giacenza#`,
  },
  sistema: {
    titolo: "Sistema",
    icona: "⚙️",
    tabelle: `
utenti: nome*,email@,ruolo[admin|utente|ospite],attivo[si|no]
permessi: nome*,descrizione
log_accessi: utente_id>utenti,data~,ip
notifiche: titolo*,utente_id>utenti,letta[si|no]
impostazioni: chiave*,valore
backup_log: file*,data~,dimensione#
modelli_email: nome*,oggetto,testo
allegati: nome*,tipo,dimensione#
tag: nome*,colore
task_pianificati: nome*,cron,attivo[si|no]`,
  },
};
