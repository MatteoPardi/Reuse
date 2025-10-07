/**
 * main.js — Logica mock per la landing page Rinnova
 * --------------------------------------------------
 * Questo file contiene funzioni modulari per:
 *  - Validazione e gestione dell'upload immagini
 *  - Simulazione delle fasi di analisi AI (mock)
 *  - Render della timeline e del risultato finale
 *
 * Ogni funzione è pensata per essere sostituita con chiamate API reali.
 * I commenti indicano i punti in cui agganciare il backend nelle fasi successive.
 */

const form = document.getElementById("object-form");
const photoInput = document.getElementById("photos");
const descriptionInput = document.getElementById("description");
const previewList = document.getElementById("preview-list");
const statusTimeline = document.getElementById("status-timeline");
const resultCard = document.getElementById("result-card");
const resultTitle = document.getElementById("result-title");
const resultPrice = document.getElementById("result-price");
const resultDescription = document.getElementById("result-description");
const analyzeButton = document.getElementById("analyze-button");
const tourButton = document.getElementById("tour-button");
const downloadButton = document.getElementById("download-button");
const shareButton = document.getElementById("share-button");

let isProcessing = false;

/**
 * Utility per aggiornare la lista dei file selezionati.
 * Mostra nome file e dimensione approssimativa.
 */
function renderPreviewList(files) {
    previewList.innerHTML = "";
    const fragment = document.createDocumentFragment();

    Array.from(files).forEach((file) => {
        const item = document.createElement("li");
        const sizeKb = Math.round(file.size / 1024);
        item.textContent = `${file.name} — ${sizeKb} KB`;
        fragment.appendChild(item);
    });

    previewList.appendChild(fragment);
}

/**
 * Semplice validazione lato client.
 * Ritorna un oggetto { isValid, message } per feedback futuri.
 */
function validateForm() {
    if (!photoInput.files || photoInput.files.length === 0) {
        return {
            isValid: false,
            message: "Carica almeno una foto per proseguire.",
        };
    }

    // Punto di estensione: applicare controlli più specifici (dimensione, formato, etc.)
    return { isValid: true, message: "" };
}

/**
 * Reset dei passi della timeline allo stato iniziale.
 */
function resetTimeline() {
    statusTimeline.querySelectorAll("li").forEach((item) => {
        item.classList.remove("is-active", "is-done");
        item.classList.add("is-pending");
    });
}

/**
 * Aggiorna visivamente lo stato della timeline.
 */
function setTimelineStep(step, state) {
    const item = statusTimeline.querySelector(`[data-step="${step}"]`);
    if (!item) return;

    item.classList.remove("is-pending", "is-active", "is-done");
    item.classList.add(`is-${state}`);
}

/**
 * Simula la risposta del backend con dati mock.
 * In futuro questa funzione chiamerà un endpoint REST/GraphQL.
 */
function buildMockResponse() {
    const selectedFiles = Array.from(photoInput.files).map((file) => file.name);
    const userDescription = descriptionInput.value.trim();

    return {
        titolo: "Borsa vintage in pelle marrone",
        prezzoStimato: "€ 48 · fascia media",
        descrizione: `Articolo valutato tramite AI: ${
            userDescription ||
            "condizioni buone, chiusure funzionanti e fodera integra"
        }. Consegna rapida e possibilità di prova su richiesta.`,
        immagini: selectedFiles,
        marketplaceSuggeriti: ["Vinted", "eBay", "Subito"],
    };
}

/**
 * Mostra l'anteprima dell'annuncio generato.
 */
function mostraRisultato(risultato) {
    resultCard.classList.remove("is-hidden");
    resultTitle.textContent = risultato.titolo;
    resultPrice.textContent = risultato.prezzoStimato;
    resultDescription.textContent = risultato.descrizione;

    // Aggiorna dataset per eventuali azioni successive (download/export)
    resultCard.dataset.result = JSON.stringify(risultato, null, 2);
}

/**
 * Simula le varie fasi dell'analisi con una sequenza asincrona.
 * Ogni step dura 1s per mostrare la progressione.
 */
async function analizzaMock() {
    const steps = ["upload", "recognition", "valuation", "copywriting"];

    for (const step of steps) {
        setTimelineStep(step, "active");
        await wait(900);
        setTimelineStep(step, "done");
    }

    const risultato = buildMockResponse();
    mostraRisultato(risultato);
}

/**
 * Utility di attesa basata su Promise.
 */
function wait(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}

/**
 * Handler principale del form.
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    if (isProcessing) return;

    const validation = validateForm();
    if (!validation.isValid) {
        analyzeButton.textContent = validation.message;
        analyzeButton.classList.add("button--error");
        setTimeout(() => {
            analyzeButton.textContent = "Avvia analisi";
            analyzeButton.classList.remove("button--error");
        }, 1800);
        return;
    }

    isProcessing = true;
    analyzeButton.disabled = true;
    analyzeButton.textContent = "Analisi in corso…";

    resetTimeline();
    resultCard.classList.add("is-hidden");

    await analizzaMock();

    analyzeButton.disabled = false;
    analyzeButton.textContent = "Rilancia analisi";
    isProcessing = false;
}

/**
 * Esporta il risultato simulato come file JSON (download manuale).
 */
function handleDownload() {
    const content = resultCard.dataset.result;
    if (!content) return;

    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rinnova_annuncio_mock.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Placeholder per futura integrazione con API di condivisione.
 * Attualmente mostra un messaggio d'esempio.
 */
function handleShare() {
    const marketplaces = ["eBay", "Vinted", "Subito"];
    const message = `Mock inviato a: ${marketplaces.join(", ")}.\nQuesta funzione chiamerà le API reali nella fase 2.`;
    alert(message);
}

/**
 * Mostra una breve spiegazione guidata del flusso.
 */
function handleTour() {
    const steps = [
        "1. Upload: il frontend valida le immagini prima di inviarle.",
        "2. Vision AI: riconosce oggetto e condizioni.",
        "3. Valutazione: combina dati storici e marketplace.",
        "4. Copywriting: l'LLM scrive titolo e descrizione perfetti.",
    ];

    alert(steps.join("\n"));
}

/**
 * Inizializzazione degli event listener.
 */
function init() {
    form.addEventListener("submit", handleFormSubmit);
    photoInput.addEventListener("change", (event) => {
        renderPreviewList(event.target.files);
    });

    downloadButton.addEventListener("click", handleDownload);
    shareButton.addEventListener("click", handleShare);
    tourButton.addEventListener("click", handleTour);

    // Accessibilità: permette il dropzone focus/enter
    const dropzone = document.getElementById("dropzone");
    dropzone.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            photoInput.click();
        }
    });
}

init();
