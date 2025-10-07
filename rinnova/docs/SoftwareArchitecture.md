# Rinnova · Frontend Mockup MoCap

Questa pagina descrive l'architettura della prima bozza frontend di **Rinnova**, sviluppata come mock dimostrativo per illustrare al cliente il funzionamento del servizio.

## Obiettivi della versione mock

- Mostrare l'interfaccia di caricamento foto e descrizione opzionale.
- Simulare il flusso di analisi: controllo file, riconoscimento, valutazione economica e generazione annuncio.
- Offrire una UI chiara e commentata per facilitare le evoluzioni future.

## Struttura delle cartelle

```
rinnova/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/ (segnaposto per future risorse)
└── docs/
    └── SoftwareArchitecture.md
```

## Componenti principali

### index.html
- Contiene il layout generale della pagina (hero, form, timeline, area risultati e sezione feature).
- Include riferimenti separati a CSS e JavaScript.
- Utilizza elementi semantici (`header`, `main`, `section`, `footer`) per migliorare accessibilità e SEO.

### assets/css/style.css
- Raccoglie gli stili globali, con uso di variabili CSS per colori, raggi, ombre.
- Sfrutta Grid e Flexbox per layout responsivi.
- I commenti indicano i punti personalizzabili dal team design.

### assets/js/main.js
- Gestisce la logica mock (validazione lato client, simulazione step IA, anteprima annuncio).
- Tutte le funzioni sono modulari e pensate per essere sostituite con chiamate API reali (fase 2).
- Comprende utility per download JSON e pulsanti mock di integrazione.

## Evoluzioni suggerite

1. **Connessione backend**: sostituire `analizzaMock()` con una chiamata `fetch` verso un endpoint Python (Flask/FastAPI) che orchestrerà pipeline IA e valutazione.
2. **Gestione stato avanzata**: introdurre un data store (es. Redux-like semplice o context) se servirà tracciare più sessioni.
3. **Autenticazione**: prevedere un sistema di login per tracciare richieste e storicizzare annunci.
4. **Analytics e logging**: integrare un modulo JS per inviare eventi (es. caricamento, esito analisi) a un backend di monitoraggio.
5. **Internazionalizzazione**: isolare testi in un file di configurazione per supportare lingue multiple.

## Note per il team

- Tutto il codice è vanilla HTML/CSS/JS per semplificare deploy su GitHub Pages.
- Le funzioni sono commentate in modo didattico per facilitare il passaggio al team con competenze miste.
- Prima di pubblicare, testare la compatibilità cross-browser (Chrome, Firefox, Safari) e su dispositivi mobili.

> _“Chiarezza prima della complessità”_: ogni file è pensato per essere letto e compreso anche senza esperienza avanzata di frontend.
