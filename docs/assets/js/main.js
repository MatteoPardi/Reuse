/**
 * main.js — Logica mock per la landing page Rinnova
 * --------------------------------------------------
 * Questo file contiene funzioni modulari per:
 *  - Validazione e gestione dell'upload immagini
 *  - Simulazione delle fasi di analisi AI (mock)
 *  - Render della timeline e del risultato finale
 *  - Gestione della selezione tra workflow annuncio ed e-commerce
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
const viewPanels = document.querySelectorAll("[data-view-panel]");
const viewSwitchTriggers = document.querySelectorAll("[data-switch-target]");

let isProcessing = false;
let activeView = null;

/**
 * Utility per aggiornare la lista dei file selezionati.
 * Mostra nome file e dimensione approssimativa.
 */
function renderPreviewList(files) {
    if (!previewList) return;

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
    if (!photoInput || !photoInput.files || photoInput.files.length === 0) {
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
    if (!statusTimeline) return;

    statusTimeline.querySelectorAll("li").forEach((item) => {
        item.classList.remove("is-active", "is-done");
        item.classList.add("is-pending");
    });
}

/**
 * Aggiorna visivamente lo stato della timeline.
 */
function setTimelineStep(step, state) {
    if (!statusTimeline) return;

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
    const selectedFiles = photoInput ? Array.from(photoInput.files).map((file) => file.name) : [];
    const userDescription = descriptionInput ? descriptionInput.value.trim() : "";

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
    if (!resultCard || !resultTitle || !resultPrice || !resultDescription) return;

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
    if (isProcessing || !analyzeButton) return;

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
    if (resultCard) {
        resultCard.classList.add("is-hidden");
    }

    await analizzaMock();

    analyzeButton.disabled = false;
    analyzeButton.textContent = "Rilancia analisi";
    isProcessing = false;
}

/**
 * Esporta il risultato simulato come file JSON (download manuale).
 */
function handleDownload() {
    if (!resultCard) return;
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
    const message = `Mock inviato a: ${marketplaces.join(", ")}.\nL'annuncio viene anche aggiunto alla vetrina e-commerce proprietaria.\nQuesta funzione chiamerà le API reali nella fase 2.`;
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
 * Determina quale vista mostrare al caricamento della pagina.
 */
function determineInitialView() {
    const params = new URLSearchParams(window.location.search);
    const queryView = params.get("view");
    if (queryView === "ecommerce" || queryView === "workflow") {
        return queryView;
    }

    const hash = window.location.hash.replace("#", "");
    if (["ecommerce", "ecommerce-view", "ecommerce-intro", "ecommerce-catalogue"].includes(hash)) {
        return "ecommerce";
    }

    return "workflow";
}

/**
 * Attiva la vista selezionata mostrando il pannello corretto
 * e aggiornando lo stato visivo dei trigger.
 */
function activateView(view) {
    if (!viewPanels.length) return;

    const previousView = activeView;
    activeView = view;

    viewPanels.forEach((panel) => {
        const isTarget = panel.dataset.viewPanel === view;
        panel.classList.toggle("is-active", isTarget);
        if (isTarget) {
            panel.removeAttribute("hidden");
        } else {
            panel.setAttribute("hidden", "");
        }
    });

    viewSwitchTriggers.forEach((trigger) => {
        const isTarget = trigger.dataset.switchTarget === view;

        if (trigger.classList.contains("view-switcher__button")) {
            trigger.classList.toggle("is-active", isTarget);
        }

        if (trigger.closest(".site-header__nav")) {
            const shouldHighlight = trigger.dataset.viewRole === "primary";
            trigger.removeAttribute("aria-current");
            trigger.classList.toggle("is-active", shouldHighlight && isTarget);
            if (shouldHighlight && isTarget) {
                trigger.setAttribute("aria-current", "page");
            }
        }
    });

    if (view === "ecommerce" && previousView !== "ecommerce" && window.RinnovaStore && typeof window.RinnovaStore.resetFilters === "function") {
        window.RinnovaStore.resetFilters();
    }
}

/**
 * Aggiorna la URL mantenendo allineato il parametro di vista e l'ancora.
 */
function syncUrl(view, hash) {
    const url = new URL(window.location);
    url.searchParams.set("view", view);

    if (typeof hash === "string") {
        url.hash = hash ? `#${hash}` : "";
    }

    history.replaceState(null, "", url.toString());
}

/**
 * Gestisce il click sui trigger di cambio vista.
 */
function handleViewSwitch(event) {
    const trigger = event.currentTarget;
    const targetView = trigger.dataset.switchTarget;
    if (!targetView) return;

    event.preventDefault();
    activateView(targetView);

    const scrollTargetId = trigger.dataset.scrollTarget;
    syncUrl(targetView, typeof scrollTargetId === "string" ? scrollTargetId : undefined);

    if (scrollTargetId) {
        const element = document.getElementById(scrollTargetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    } else {
        const panel = document.querySelector(`[data-view-panel="${targetView}"]`);
        if (panel) {
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
}

/**
 * Inizializza gli event listener per la selezione vista.
 */
function setupViewSwitching() {
    if (!viewPanels.length) return;

    const initialView = determineInitialView();
    activateView(initialView);
    syncUrl(initialView);

    viewSwitchTriggers.forEach((trigger) => {
        trigger.addEventListener("click", handleViewSwitch);
    });
}

/**
 * Inizializzazione degli event listener del workflow mock.
 */
function init() {
    setupViewSwitching();

    if (!form || !photoInput || !statusTimeline || !resultCard || !analyzeButton) {
        return;
    }

    form.addEventListener("submit", handleFormSubmit);

    photoInput.addEventListener("change", (event) => {
        renderPreviewList(event.target.files);
    });

    if (downloadButton) {
        downloadButton.addEventListener("click", handleDownload);
    }

    if (shareButton) {
        shareButton.addEventListener("click", handleShare);
    }

    if (tourButton) {
        tourButton.addEventListener("click", handleTour);
    }

    const dropzone = document.getElementById("dropzone");
    if (dropzone) {
        dropzone.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                photoInput.click();
            }
        });
    }
}

init();
