(() => {
  const STYLE_ID = "ef-visual-mindmap-styles";

  function injectStyles() {
    try {
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
          padding: 20px 16px;
          margin-top: 14px;
          color: #292524;
          box-shadow: 0 8px 22px rgba(41, 37, 36, 0.08);
        }

        .ef-mm-toolbar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1.5px dashed #d6cbb5;
        }

        .ef-mm-badge {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
          background: #ede9fe;
          color: #5b21b6;
          border: 1.5px solid #c4b5fd;
        }

        .ef-mm-btn {
          background: #fffdf9;
          border: 1.5px solid #cbd5e1;
          color: #1e293b;
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .ef-mm-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        @media (max-width: 820px) {
          .ef-mm-grid { grid-template-columns: 1fr; }
        }

        .ef-mm-card {
          border-radius: 16px;
          padding: 12px 14px;
          border: 2px solid rgba(41, 37, 36, 0.2);
          box-shadow: 2px 3px 0 rgba(41, 37, 36, 0.08);
        }

        .ef-mm-card-title {
          font-family: 'Caveat', cursive, sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 6px;
          color: #1c1917;
        }

        .ef-mm-card-body {
          font-family: 'Patrick Hand', cursive, sans-serif;
          font-size: 0.96rem;
          line-height: 1.35;
          color: #292524;
        }

        .ef-mm-card-body ul {
          margin: 0;
          padding-left: 16px;
        }

        .ef-tone-sage  { background: #dce8d6; border-color: #84a98c; }
        .ef-tone-rose  { background: #f7d6d8; border-color: #e07a82; }
        .ef-tone-sky   { background: #d7eaf8; border-color: #6ba4d9; }
        .ef-tone-lilac { background: #e6dcf5; border-color: #9b7ede; }
        .ef-tone-peach { background: #fadcd0; border-color: #e08d6d; }
        .ef-tone-amber { background: #f9e7b8; border-color: #d4a338; }
        .ef-tone-mint  { background: #d9edd9; border-color: #68b078; }

        .ef-mm-center-cloud {
          background: radial-gradient(circle at 30% 25%, #f3e8ff 0%, #e9d5ff 80%);
          border: 3px solid #7e22ce;
          border-radius: 36px;
          padding: 16px 14px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 0 #c084fc;
        }

        .ef-mm-center-title {
          font-family: 'Caveat', cursive, sans-serif;
          font-size: 1.7rem;
          font-weight: 700;
          line-height: 1.1;
          color: #3b0764;
          margin: 0 0 4px;
        }

        .ef-mm-takeaway {
          margin-top: 14px;
          background: #fef3c7;
          border: 2px solid #d97706;
          border-radius: 14px;
          padding: 10px 14px;
          font-family: 'Patrick Hand', cursive, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #78350f;
          text-align: center;
        }
      `;
      document.head.appendChild(style);
    } catch (_) {}
  }

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[m]));
  }

  function getChapterInfo() {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3")).filter((el) => {
      const t = (el.textContent || "").trim();
      return t.length > 3 && !t.includes("ExamForge") && !t.includes("Score:") && !t.includes("No Matching");
    });
    const chapterTitle = headings.length ? headings[headings.length - 1].textContent.trim() : "Chapter Mind Map";

    const pts = [];
    document.querySelectorAll("li, p").forEach((el) => {
      const t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (
        t.length > 16 &&
        t.length < 200 &&
        !t.includes("2-Minute Exam Morning Revision Flow") &&
        !t.includes("Toggle All") &&
        !t.includes("Restart Quiz") &&
        !pts.includes(t)
      ) {
        pts.push(t);
      }
    });

    const slice = (i, n, fb) => (pts.slice(i, i + n).length ? pts.slice(i, i + n) : fb);

    return {
      chapterTitle,
      cards: [
        { tone: "ef-tone-sage", title: "📘 Core Concepts", items: slice(0, 2, ["Key definitions & syllabus basics.", "Core chapter terminology."]) },
        { tone: "ef-tone-rose", title: "⚡ Laws & Principles", items: slice(2, 2, ["Governing rules & concepts.", "Important relationships."]) },
        { tone: "ef-tone-sky", title: "🔍 Working & Analysis", items: slice(4, 2, ["Step-by-step explanation.", "Comparison & reasoning points."]) },
        { tone: "ef-tone-lilac", title: "🧭 Context & Conditions", items: slice(6, 2, ["Conditions & exceptions.", "Syllabus context."]) },
        { tone: "ef-tone-peach", title: "🧩 Key Components", items: slice(8, 2, ["Important parts & examples.", "Frequently asked sub-topics."]) },
        { tone: "ef-tone-amber", title: "📐 Formulas & Rules", items: slice(10, 2, ["Key equations, units or rules.", "Exam-ready statements."]) },
        { tone: "ef-tone-mint", title: "🎯 Board Exam Focus", items: slice(12, 2, ["High-weightage PYQ areas.", "Avoid common exam mistakes."]) })
      ]
    };
  }

  function renderMap(host) {
    injectStyles();
    const info = getChapterInfo();
    const mkCard = (c) => `
      <div class="ef-mm-card ${c.tone}">
        <h4 class="ef-mm-card-title">${esc(c.title)}</h4>
        <div class="ef-mm-card-body"><ul>${c.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>`;

    host.innerHTML = `
      <div class="ef-mm-canvas">
        <div class="ef-mm-toolbar">
          <span class="ef-mm-badge">🧠 Chapter Visual Mind Map</span>
          <button type="button" class="ef-mm-btn" id="ef-mm-print">🖨️ Print</button>
        </div>
        <div class="ef-mm-grid">
          ${mkCard(info.cards[0])}
          ${mkCard(info.cards[1])}
          ${mkCard(info.cards[2])}
          ${mkCard(info.cards[3])}
          <div class="ef-mm-center-cloud">
            <h3 class="ef-mm-center-title">${esc(info.chapterTitle)}</h3>
            <p class="ef-mm-card-body" style="margin:0;">ISC Class 12 Visual Overview</p>
          </div>
          ${mkCard(info.cards[4])}
          ${mkCard(info.cards[5])}
          <div class="ef-mm-card ef-tone-lilac" style="text-align:center;">
            <h4 class="ef-mm-card-title">🔗 Revision Flow</h4>
            <div class="ef-mm-card-body">Concept ➔ Rule ➔ Formula ➔ Board Answer</div>
          </div>
          ${mkCard(info.cards[6])}
        </div>
        <div class="ef-mm-takeaway">💡 Quick Takeaway: Revise core concepts, rules, and board keywords together for ${esc(info.chapterTitle)}.</div>
      </div>`;

    const pBtn = document.getElementById("ef-mm-print");
    if (pBtn) pBtn.onclick = () => window.print();
  }

  function bindQuizTab() {
    try {
      const quizTab = Array.from(document.querySelectorAll("button, [role='tab'], div, span")).find((el) => {
        if (el.dataset && el.dataset.efMmDone) return false;
        const txt = (el.textContent || "").trim();
        const isClickable = el.tagName === "BUTTON" || el.getAttribute("role") === "tab" || typeof el.onclick === "function";
        return isClickable && (txt.includes("Practice Quiz") || txt === "Quiz 15" || txt === "Practice Quiz 15");
      });

      if (!quizTab) return;
      quizTab.dataset.efMmDone = "true";
      quizTab.textContent = "🧠 Mind Map";

      const parent = quizTab.parentElement;
      if (!parent || !parent.parentElement) return;

      let host = document.getElementById("ef-mm-host");
      if (!host) {
        host = document.createElement("div");
        host.id = "ef-mm-host";
        host.style.display = "none";
        parent.parentElement.appendChild(host);
      }

      const showMap = () => {
        Array.from(parent.parentElement.children).forEach((el) => {
          if (el !== parent && el !== host) {
            el.dataset.efMmPrevDisplay = el.style.display || "";
            el.style.display = "none";
          }
        });
        host.style.display = "block";
        renderMap(host);
      };

      const hideMap = () => {
        host.style.display = "none";
        Array.from(parent.parentElement.children).forEach((el) => {
          if (el !== parent && el !== host && "efMmPrevDisplay" in el.dataset) {
            el.style.display = el.dataset.efMmPrevDisplay;
          }
        });
      };

      quizTab.addEventListener("click", () => {
        setTimeout(showMap, 0);
      });

      Array.from(parent.children).forEach((other) => {
        if (other !== quizTab && !other.dataset.efMmHide) {
          other.dataset.efMmHide = "true";
          other.addEventListener("click", () => {
            setTimeout(hideMap, 0);
          });
        }
      });
    } catch (_) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bindQuizTab();
      setInterval(bindQuizTab, 500);
    });
  } else {
    bindQuizTab();
    setInterval(bindQuizTab, 500);
  }
})();
    
