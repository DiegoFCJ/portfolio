# Activity: Reorganize Skills Section

## Background
La sezione "Skill" del portfolio presenta un elenco disordinato di linguaggi, framework e strumenti DevOps assegnati a categorie non pertinenti. Questo causa confusione e mina la credibilità del profilo professionale.

## Obiettivo
Ristrutturare la sezione dedicata alle competenze affinché rappresenti in modo chiaro il profilo da programmatore, separando le skill per categoria e assicurando coerenza terminologica.

## Deliverable
- Nuova struttura delle skill suddivisa in categorie significative (es. Linguaggi di Programmazione, Framework & Librerie, DevOps & Tooling, Design & Multimedia, Soft Skills rilevanti).
- Aggiornamento dei testi nelle lingue supportate (IT, EN, DE, ES) con terminologia coerente.
- Documentazione dell'organizzazione adottata per facilitarne l'estensione futura.

## Attività Principali
1. **Audit dei contenuti attuali**
   - Mappare tutte le voci presenti nella sezione skill.
   - Identificare incongruenze, duplicati e assegnazioni errate.
2. **Definizione delle categorie**
   - Stabilire un set di categorie coerenti con il profilo di sviluppatore.
   - Validare che ogni categoria abbia un criterio chiaro di inclusione.
3. **Riassegnazione delle skill**
   - Riposizionare ogni skill nella categoria corretta.
   - Normalizzare la nomenclatura (es. utilizzare "TypeScript" invece di "TS").
4. **Aggiornamento dei file di dati**
   - Modificare i file in `src/app/data` responsabili della sezione skill per riflettere la nuova struttura.
   - Assicurarsi che tutte le lingue disponibili siano sincronizzate.
5. **Revisione UI/UX**
   - Verificare che il layout supporti la nuova organizzazione (eventualmente aggiornare componenti o stili).
6. **QA e Accessibilità**
   - Controllare che i lettori di schermo leggano le categorie in modo corretto.
   - Eseguire un controllo visivo per coerenza tipografica e spaziatura.

## Criteri di Accettazione
- Ogni skill è assegnata a una categoria appropriata senza duplicazioni.
- La sezione è disponibile in tutte le lingue supportate con traduzioni coerenti.
- Il layout risulta leggibile sia su desktop che su dispositivi mobili.
- Non sono presenti riferimenti a tecnologie non pertinenti al profilo.

## Rischi e Dipendenze
- **Dipendenze**: file di dati multilingua (`translation.service`, contenuti localizzati), eventuali componenti condivisi che mostrano le skill.
- **Rischi**: perdita di traduzioni durante il refactor, inconsistenze tra ambienti linguistici, regressioni nel layout.

## Note Operative
- Documentare le scelte di categorizzazione nella sezione README o in un file dedicato per future espansioni.
- Valutare l'inserimento di icone o indicatori di livello di esperienza se utile alla leggibilità.

