(() => {
  const STYLE_ID = "ef-visual-mindmap-styles";
  const CACHE_PREFIX = "ef_visual_mm_v1_";

  // 1. Inject Sketchnote Paper & Pastel Card Styles
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Patrick+Hand&display=swap');

      .ef-mm-canvas {
        position: relative;
        background-color: #faf6ee;
        background-image: radial-gradient(#dcd3c1 1px, transparent 1px);
        background-size: 18px 18px;
        border: 2px solid #e2d8c5;
        border-radius: 18px;
        padding: 24px 20px 20px;
        margin-top: 14px;
        color: #292524;
        box-shadow: 0 10px 28px rgba(41, 37, 36, 0.08);
        overflow: hidden;
      }

      .ef-mm-toolbar {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-bottom: 16px;
        padding-bottom: 10px;
        border-bottom: 1.5px dashed #d6cbb5;
      }

      .ef-mm-badge {
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.03em;
        padding: 4px 12px;
        border-radius: 999px;
        background: #ede9fe;
        color: #5b21b6;
        border: 1.5px solid #c4b5fd;
      }

      .ef-mm-btn {
        background: #fffdf9;
        border: 1.5px solid #cbd5e1;
        color: #1e293b;
        padding: 5px 12px;
        border-radius: 8px;
        font-size: 0.82rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .ef-mm-btn:hover {
        background: #f1f5f9;
        border-color: #94a3b8;
      }

      .ef-mm-grid {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: auto auto auto;
        gap: 18px 20px;
        align-items: stretch;
        z-index: 2;
      }

      @media (max-width: 820px) {
        .ef-mm-grid {
          grid-template-columns: 1fr;
        }
        .ef-mm-arrows-svg {
          display: none !important;
        }
      }

      .ef-mm-arrows-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }

      /* Hand-drawn pastel branch cards matching reference image */
      .ef-mm-card {
        border-radius: 16px 20px 15px 18px;
        padding: 13px 15px;
        border: 2px solid rgba(41, 37, 36, 0.22);
        box-shadow: 2px 3px 0px rgba(41, 37, 36, 0.09);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        transition: transform 0.18s ease;
      }
      .ef-mm-card:hover {
        transform: translateY(-2px);
      }

      .ef-mm-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 6px;
        padding-bottom: 4px;
        border-bottom: 1.5px dashed rgba(41, 37, 36, 0.2);
      }

      .ef-mm-card-title {
        font-family: 'Caveat', cursive, sans-serif;
        font-size: 1.38rem;
        font-weight: 700;
        line-height: 1.15;
        color: #1c1917;
        margin: 0;
      }

      .ef-mm-card-icon {
        font-size: 1.25rem;
        flex-shrink: 0;
      }

      .ef-mm-card-body {
        font-family: 'Patrick Hand', cursive, sans-serif;
        font-size: 0.98rem;
        line-height: 1.38;
        color: #292524;
        margin: 0;
      }

      .ef-mm-card-body ul {
        margin: 0;
        padding-left: 16px;
      }
      .ef-mm-card-body li {
        margin-bottom: 3px;
      }

      /* Pastel Palette from Reference Image */
      .ef-tone-sage   { background: #dce8d6; border-color: #84a98c; }
      .ef-tone-rose   { background: #f7d6d8; border-color: #e07a82; }
      .ef-tone-sky    { background: #d7eaf8; border-color: #6ba4d9; }
      .ef-tone-lilac  { background: #e6dcf5; border-color: #9b7ede; }
      .ef-tone-peach  { background: #fadcd0; border-color: #e08d6d; }
      .ef-tone-amber  { background: #f9e7b8; border-color: #d4a338; }
      .ef-tone-mint   { background: #d9edd9; border-color: #68b078; }

      /* Center Cloud Hub */
      .ef-mm-center-cloud {
        background: radial-gradient(circle at 30% 25%, #f3e8ff 0%, #e9d5ff 75%, #ddd6fe 100%);
        border: 3px solid #7e22ce;
        border-radius: 46% 54% 48% 52% / 52% 45% 55% 48%;
        padding: 20px 18px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 0 #c084fc, 0 12px 24px rgba(126, 34, 206, 0.16);
        min-height: 165px;
      }

      .ef-mm-center-title {
        font-family: 'Caveat', cursive, sans-serif;
        font-size: 1.85rem;
        font-weight: 700;
        line-height: 1.1;
        color: #3b0764;
        margin: 0 0 6px;
      }

      .ef-mm-center-sub {
        font-family: 'Patrick Hand', cursive, sans-serif;
        font-size: 0.96rem;
        color: #581c87;
        margin: 0;
        line-height: 1.25;
      }

      /* Bottom Golden Takeaway Pill */
      .ef-mm-takeaway {
        margin-top: 18px;
        background: #fef3c7;
        border: 2px solid #d97706;
        border-radius: 999px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-family: 'Patrick Hand', cursive, sans-serif;
        font-size: 1.05rem;
        font-weight: 600;
        color: #78350f;
        text-align: center;
        box-shadow: 2px 3px 0 rgba(217, 119, 6, 0.18);
      }

      @media print {
        body * { visibility: hidden; }
        #ef-visual-mindmap-view, #ef-visual-mindmap-view * { visibility: visible; }
        #ef-visual-mindmap-view {
          position: fixed;
          inset: 0;
          width: 100%;
          margin: 0;
          box-shadow: none;
        }
        .ef-mm-toolbar { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function escapeHTML(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 2. Extract Real Chapter Data from ExamForge's Existing DOM / MindMap / PYQs
  function extractChapterData() {
    const headingEl =
      document.querySelector('[role="dialog"] h2, .modal h2, #studyHubModal h2, h2') ||
      document.querySelector("h2");
    const chapterTitle = headingEl ? headingEl.textContent.trim() : "Chapter Overview";

    const badgeEl = document.querySelector(
      '[role="dialog"] .subject-badge, .modal .badge, [aria-selected="true"]'
    );
    const subject = badgeEl ? badgeEl.textContent.trim() : "ISC Class 12";

    // Harvest existing structured nodes from the chapter's Quick Morning Mind Map & PYQ sections
    const rawItems = [];
    const containers = document.querySelectorAll(
      '[role="dialog"] li, [role="dialog"] p, [role="dialog"] h4, .modal li, .modal p, .modal h4'
    );
    containers.forEach((el) => {
      const txt = el.textContent.replace(/\s+/g, " ").trim();
      if (
        txt.length > 14 &&
        txt.length < 220 &&
        !txt.includes("2-Minute Exam Morning Revision Flow") &&
        !txt.includes("Toggle All") &&
        !txt.includes("Score:") &&
        !txt.includes("Restart Quiz") &&
        !rawItems.includes(txt)
      ) {
        rawItems.push(txt);
      }
    });

    // Partition harvested chapter points cleanly across the 6 radial sketchnote branches
    const pickSlice = (start, count, fallback) => {
      const slice = rawItems.slice(start, start + count);
      return slice.length ? slice : fallback;
    };

    return {
      subject,
      chapterTitle,
      subtitle: `ISC Class 12 • ${subject} Complete Visual Revision Map`,
      branches: [
        {
          slot: "top-left",
          tone: "ef-tone-sage",
          icon: "📘",
          title: "Core Concepts & Definitions",
          points: pickSlice(0, 2, [
            `Fundamental principles and scope of ${chapterTitle}.`,
            "Key ISC syllabus terminology and foundational definitions."
          ])
        },
        {
          slot: "top-center",
          tone: "ef-tone-rose",
          icon: "⚡",
          title: "Laws, Principles & Origins",
          points: pickSlice(2, 2, [
            `Primary governing rules and theoretical basis of ${chapterTitle}.`,
            "Cause-and-effect relationships tested in CISCE board papers."
          ])
        },
        {
          slot: "top-right",
          tone: "ef-tone-sky",
          icon: "🔍",
          title: "Mechanism & Deep Analysis",
          points: pickSlice(4, 2, [
            "Step-by-step working, derivations, or textual/logical breakdown.",
            "Analytical distinctions required for 3-mark and 5-mark answers."
          ])
        },
        {
          slot: "mid-left",
          tone: "ef-tone-lilac",
          icon: "🧭",
          title: "Conditions & Context",
          points: pickSlice(6, 2, [
            "Boundary conditions, exceptions, and prerequisite assumptions.",
            "Contextual relevance within the ISC Class 12 curriculum."
          ])
        },
        {
          slot: "mid-right",
          tone: "ef-tone-peach",
          icon: "🧩",
          title: "Key Elements & Cases",
          points: pickSlice(8, 2, [
            "Essential components, classifications, or critical examples.",
            "Frequently paired sub-topics in ISC structured questions."
          ])
        },
        {
          slot: "bottom-left",
          tone: "ef-tone-amber",
          icon: "📐",
          title: "Formulas, Rules & Syntax",
          points: pickSlice(10, 2, [
            "Must-memorize equations, SI units, syntax, or key quotes.",
            "Standard notation expected by CISCE examiners."
          ])
        },
        {
          slot: "bottom-right",
          tone: "ef-tone-mint",
          icon: "🎯",
          title: "Board Exam Focus & Traps",
          points: pickSlice(12, 2, [
            "High-weightage PYQ patterns and diagram/step-marking checkpoints.",
            "Avoid common conceptual confusions in Section B & C."
          ])
        }
      ],
      takeaway: `Master ${chapterTitle}: Connect core definitions → governing rules → exact ISC board keywords for full marks!`
    };
  }

  // 3. Render the Sketchnote Visual Mind Map matching the reference layout
  function renderVisualMindMap(container) {
    injectStyles();
    const data = extractChapterData();

    const cardHTML = (b) => `
      <div class="ef-mm-card ${b.tone}">
        <div class="ef-mm-card-header">
          <h4 class="ef-mm-card-title">${escapeHTML(b.title)}</h4>
          <span class="ef-mm-card-icon">${b.icon}</span>
        </div>
        <div class="ef-mm-card-body">
          <ul>
            ${b.points.map((pt) => `<li>${escapeHTML(pt)}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;

    container.innerHTML = `
      <div class="ef-mm-canvas" id="ef-visual-mindmap-view">
        <div class="ef-mm-toolbar">
          <span class="ef-mm-badge">✨ Visual Chapter Mind Map • ${escapeHTML(data.subject)}</span>
          <div style="display:flex;gap:8px;">
            <button type="button" class="ef-mm-btn" id="ef-mm-print-btn">🖨️ Print / Save A4</button>
          </div>
        </div>

        <div style="position:relative;">
          <!-- Curved Hand-Drawn Style Connector Arrows from Central Cloud -->
          <svg class="ef-mm-arrows-svg" viewBox="0 0 900 560" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="ef-arrow-purple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,1 L7,4 L0,7 Z" fill="#7e22ce" />
              </marker>
              <marker id="ef-arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,1 L7,4 L0,7 Z" fill="#2563eb" />
              </marker>
              <marker id="ef-arrow-amber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,1 L7,4 L0,7 Z" fill="#b45309" />
              </marker>
              <marker id="ef-arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,1 L7,4 L0,7 Z" fill="#15803d" />
              </marker>
            </defs>
            <!-- Center to Top-Left -->
            <path d="M 355 215 Q 315 175 275 155" fill="none" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round" marker-end="url(#ef-arrow-blue)" />
            <!-- Center to Top-Center -->
            <path d="M 450 195 L 450 155" fill="none" stroke="#7e22ce" stroke-width="2.6" stroke-linecap="round" marker-end="url(#ef-arrow-purple)" />
            <!-- Center to Top-Right -->
            <path d="M 545 215 Q 585 175 625 155" fill="none" stroke="#2563eb" stroke-width="2.6" stroke-linecap="round" marker-end="url(#ef-arrow-blue)" />
            <!-- Center to Mid-Left -->
            <path d="M 325 275 L 285 275" fill="none" stroke="#7e22ce" stroke-width="2.6" stroke-linecap="round" marker-end="url(#ef-arrow-purple)" />
            <!-- Center to Mid-Right -->
            <path d="M 575 275 L 615 275" fill="none" stroke="#7e22ce" stroke-width="2.6" stroke-linecap="round" marker-end="url(#ef-arrow-purple)" />
            <!-- Center to Bottom-Left -->
            <path d="M 365 345 Q 320 385 275 405" fill="none" stroke="#b45309" stroke-width="2.6" stroke-linecap="round" marker-end="url(#ef-arrow-amber)" />
            <!-- Center to Bottom-Right -->
            <path d="M 535 345 Q 580 385 625 405" fill="none" stroke="#15803d" stroke-width="2.6" stroke-linecap="round" marker-end="url(#ef-arrow-green)" />
          </svg>

          <div class="ef-mm-grid">
            <!-- Row 1: Top-Left, Top-Center, Top-Right -->
            ${cardHTML(data.branches[0])}
            ${cardHTML(data.branches[1])}
            ${cardHTML(data.branches[2])}

            <!-- Row 2: Mid-Left, CENTER CLOUD HUB, Mid-Right -->
            ${cardHTML(data.branches[3])}

            <div class="ef-mm-center-cloud">
              <h3 class="ef-mm-center-title">${escapeHTML(data.chapterTitle)}</h3>
              <p class="ef-mm-center-sub">${escapeHTML(data.subtitle)}</p>
            </div>

            ${cardHTML(data.branches[4])}

            <!-- Row 3: Bottom-Left, Center Connector Spacer / Bridge Card, Bottom-Right -->
            ${cardHTML(data.branches[5])}

            <div class="ef-mm-card ef-tone-lilac" style="justify-content:center;text-align:center;">
              <div class="ef-mm-card-header" style="justify-content:center;">
                <h4 class="ef-mm-card-title">🔗 Chapter Flow</h4>
              </div>
              <p class="ef-mm-card-body">
                <strong>Concept</strong> ➔ <strong>Principle</strong> ➔ <strong>Formula / Rule</strong> ➔ <strong>ISC Board Answer</strong>
              </p>
            </div>

            ${cardHTML(data.branches[6])}
          </div>
        </div>

        <div class="ef-mm-takeaway">
          <span style="font-size:1.3rem;">💡</span>
          <span>${escapeHTML(data.takeaway)}</span>
        </div>
      </div>
    `;

    document.getElementById("ef-mm-print-btn")?.addEventListener("click", () => {
      window.print();
    });
  }

  // 4. Replace "Practice Quiz" Tab with "Visual Mind Map" Non-Destructively
  function replaceQuizTabWithMindMap() {
    const allTabs = Array.from(document.querySelectorAll("button, [role='tab']"));
    const quizTab = allTabs.find(
      (el) => el.textContent && el.textContent.includes("Practice Quiz")
    );

    if (!quizTab || quizTab.dataset.efMindMapConverted === "true") return;

    quizTab.dataset.efMindMapConverted = "true";
    // Replace label cleanly from "Practice Quiz 15" -> "Visual Mind Map"
    quizTab.innerHTML = `🧠 Visual Mind Map`;

    const tabBar = quizTab.parentElement;
    if (!tabBar || !tabBar.parentElement) return;

    // Create dedicated Visual Mind Map host container
    let mmHost = document.getElementById("ef-visual-mindmap-host");
    if (!mmHost) {
      mmHost = document.createElement("div");
      mmHost.id = "ef-visual-mindmap-host";
      mmHost.style.display = "none";
      tabBar.parentElement.appendChild(mmHost);
    }

    // Helper to locate and hide/show the original quiz container without destroying state
    const toggleQuizView = (showMindMap) => {
      const quizPanel = Array.from(tabBar.parentElement.children).find(
        (child) =>
          child !== mmHost &&
          child !== tabBar &&
          (child.textContent.includes("Question 0 of") ||
            child.textContent.includes("Restart Quiz") ||
            child.textContent.includes("Score:"))
      );

      if (showMindMap) {
        if (quizPanel) quizPanel.style.display = "none";
        mmHost.style.display = "block";
        renderVisualMindMap(mmHost);
      } else {
        mmHost.style.display = "none";
      }
    };

    // Clicking our new "Visual Mind Map" tab renders the chapter's visual map
    quizTab.addEventListener("click", () => {
      setTimeout(() => toggleQuizView(true), 0);
    });

    // Clicking any other existing tab (Quick Morning Mind Map, Repeated PYQs, Expected Questions) hides the Visual Mind Map cleanly
    Array.from(tabBar.querySelectorAll("button, [role='tab']")).forEach((siblingTab) => {
      if (siblingTab !== quizTab && !siblingTab.dataset.efSiblingBound) {
        siblingTab.dataset.efSiblingBound = "true";
        siblingTab.addEventListener("click", () => toggleQuizView(false));
      }
    });

    // Re-render automatically if the user switches to a different chapter while Visual Mind Map is open
    const modalHeading = document.querySelector('[role="dialog"] h2, .modal h2, h2');
    if (modalHeading && !modalHeading.dataset.efMmObserved) {
      modalHeading.dataset.efMmObserved = "true";
      new MutationObserver(() => {
        if (mmHost.style.display === "block") {
          renderVisualMindMap(mmHost);
        }
      }).observe(modalHeading, { childList: true, characterData: true, subtree: true });
    }
  }

  const observer = new MutationObserver(() => replaceQuizTabWithMindMap());
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("DOMContentLoaded", replaceQuizTabWithMindMap);
})();

