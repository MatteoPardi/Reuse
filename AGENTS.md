# AGENTS.md  

## 🧭 Visione generale del progetto

**Rinnova** è un progetto di sviluppo software assistito da intelligenze artificiali conversazionali.  
Scopo: creare un **servizio web intelligente** che analizzi e valuti **oggetti usati o di scarto**, producendo automaticamente una **stima del valore di mercato** e una **descrizione di vendita** pronta all’uso.

L’AI dovrà:
1. Riconoscere il tipo di oggetto (da foto e testo descrittivo).  
2. Valutarne lo stato di conservazione.  
3. Stimare un valore economico (da conoscenza interna o API esterne).  
4. Generare un annuncio descrittivo convincente e coerente.  

Il sistema sarà utilizzabile da:
- Privati che vogliono vendere o stimare oggetti usati;  
- Antiquari, mercatini, centri di riuso;  
- Aziende o enti ambientali interessati al riciclo e alla valorizzazione di materiali.

---

## 👥 Contesto del team

Il team di sviluppo è **piccolo e multidisciplinare**, composto da:
- Un **fisico/data scientist**, con esperienza di analisi dati;  
- Un **laureato in scienze naturali**, con conoscenze base di programmazione.  

➡️ **Livello tecnico del team:** intermedio-basso  
➡️ **Linguaggio principale:** Python  
➡️ **Esperienza limitata in frontend (HTML, CSS, JS)**

Gli agenti AI devono quindi:
- Usare linguaggio chiaro e didattico;  
- Spiegare i motivi delle scelte architetturali;  
- Proporre codice semplice, commentato e mantenibile;  
- Offrire soluzioni incrementali, evitando tecnicismi non spiegati.

---

## 💡 Obiettivo tecnico del progetto

Creare un **servizio web modulare** composto da:

| Componente | Funzione principale |
|-------------|--------------------|
| **Frontend** | Interfaccia utente per upload immagini e testo, visualizzazione risultati |
| **Backend AI** | Pipeline di analisi multimodale (LLM + Vision model) |
| **Database** | Gestione utenti, risultati, log analitici |
| **Integration Layer** | Connessione con API esterne (eBay, Vinted, Subito, ecc.) |
| **Logging e tracciabilità** | Monitoraggio e debug del sistema |

---

## 🧱 Fasi di sviluppo

| Fase | Descrizione | Output |
|------|--------------|--------|
| **1️⃣ Frontend mockup** | Sito statico HTML/CSS/JS, UI/UX di base | Pagina demo interattiva |
| **2️⃣ Backend prototipale** | Collegamento del frontend a un backend Python con pipeline AI simulata | API testabile |
| **3️⃣ Backend completo + deploy** | Sistema completo con database, login e integrazioni API | Applicazione online funzionante |

---

## ⚙️ Linee guida operative per agenti AI

Quando agisci come **agente AI per il progetto Rinnova**, segui le seguenti regole:

### 1. Stile e linguaggio
- Usa un **tono tecnico ma accessibile**.  
- Evita acronimi o termini non spiegati.  
- Fornisci sempre **una breve motivazione** per ogni decisione tecnica.  

### 2. Architettura e coerenza
- Mantieni la **separazione netta** tra HTML, CSS e JavaScript.  
- Il frontend deve essere compatibile con **GitHub Pages**.  
- Tutto il codice JS deve poter passare facilmente da *mock* a *API reali* (Fase 2).  
- Rispetta la filosofia: **“mock oggi, integrazione domani”**.

### 3. Produzione di codice
- Ogni blocco di codice deve essere **autosufficiente e commentato**.  
- Prediligi **funzioni pure e modulari**.  
- Evita librerie complesse; usa JS nativo o dipendenze minime.  
- In Python, privilegia la chiarezza su performance premature.  
- Ogni script o file deve includere un’intestazione esplicativa (ruolo, estensibilità).  

### 4. Estensibilità
- Ogni file o modulo deve essere pensato per poter essere **sostituito o esteso** senza riscrivere l’intero progetto.  
- Se possibile, documenta i **punti di estensione** nei commenti o README.

### 5. Documentazione automatica
- Ogni agente deve contribuire a mantenere **documentazione aggiornata e leggibile**.  
- Genera commenti tecnici, docstring e brevi README per i moduli creati.

---

## 🧠 Linee guida specifiche per Fase 1 — *Frontend statico*

Il codice deve rispettare la seguente struttura:

```
docs/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/
└── documentation/
    └── SoftwareArchitecture.md
```

### Requisiti principali:
- `index.html`: contiene form di caricamento immagine, campo testo, pulsante “Analizza”, e area risultati.  
- `main.js`: gestisce la logica mock, con funzioni come:
  ```js
  async function analizzaMock() {
      const risultato = {
          oggetto: "Borsa in pelle",
          condizione: "Buona",
          valore: "€45"
      };
      mostraRisultato(risultato);
  }
  ```
- `style.css`: layout semplice (Flexbox o Grid), leggibile, facilmente sostituibile.

---

## 🪶 Filosofia del progetto

> **“Chiarezza prima della complessità.”**  
> **“Spiegare è costruire.”**  
> **“Ogni riga di codice deve insegnare qualcosa.”**

Gli agenti AI devono sempre:
- Spiegare il *perché* di ogni scelta tecnica;  
- Evitare “magia nera” o codice opaco;  
- Fornire esempi, alternative e buone pratiche;  
- Adattarsi al livello tecnico del team.

---

## 🧰 Stack tecnico di riferimento

| Ambito | Tecnologie suggerite |
|--------|----------------------|
| Linguaggio | Python |
| Web Framework | Flask o FastAPI |
| Frontend | HTML, CSS, JS nativo |
| Database | SQLite (poi PostgreSQL) |
| Integrazioni | eBay, Vinted, Subito API |
| AI | GPT / Claude / Vision models |
| Hosting | GitHub Pages + Render / HuggingFace Spaces |

---

## 🔍 Output atteso dagli agenti AI

Quando produci codice o documentazione, assicurati che:
- Il file sia coerente con questa architettura e filosofia;  
- Sia comprensibile e funzionante anche per un utente non esperto;  
- Contenga spiegazioni inline o in markdown se utile al team;  
- Non richieda librerie o ambienti complessi per essere testato.

---

## 📘 Riferimenti interni

- [problem_description_v01.md](./problem_description_v01.md)  
- [software_architecture_v01.md](./software_architecture_v01.md)
