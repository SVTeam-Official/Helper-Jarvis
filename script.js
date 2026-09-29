/* ============================================================
   Helper-Jarvis — site behavior
   Theme toggle · typing terminal · copy buttons · reveal
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      root.style.colorScheme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* private mode — ignore */
      }
    });
  }

  /* ---------- Typing terminal ---------- */
  var term = document.getElementById("term");

  var SCRIPT = [
    { cls: "t-meta", text: "$ helper-jarvis --start\n" },
    { cls: "t-ok", text: "✓ api key detected … endpoint: OPENAI_API_KEY\n" },
    { cls: "t-ok", text: "✓ voice I/O online · vision online · memory loaded\n" },
    { cls: "t-user", text: "\n“Jarvis, good morning. What's on my plate?”\n" },
    { cls: "t-bot", text: "\nGood morning, sir. Three meetings today — your 10 a.m.\n" },
    { cls: "t-bot", text: "was moved to 11:30, and 47 emails came in overnight.\n" },
    { cls: "t-bot", text: "Shall I summarize them before your coffee is ready?\n" },
    { cls: "t-meta", text: "\n[ tools: calendar ✓ · mail ✓ · weather ✓ ]\n" }
  ];

  var caret = null;
  var reducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function makeCaret() {
    var span = document.createElement("span");
    span.className = "t-caret";
    span.innerHTML = "&nbsp;";
    return span;
  }

  function typeScript() {
    if (!term) return;
    caret = makeCaret();
    term.appendChild(caret);
    var line = 0;

    function typeLine() {
      if (line >= SCRIPT.length) {
        // restart the whole scene after a pause
        setTimeout(function () {
          term.textContent = "";
          typeScript();
        }, 6000);
        return;
      }
      var item = SCRIPT[line];
      var span = document.createElement("span");
      span.className = item.cls;
      term.insertBefore(span, caret);
      var chars = item.text;
      var i = 0;

      function tick() {
        if (i < chars.length) {
          // type a couple chars per frame for pace
          span.textContent += chars.slice(i, i + 2);
          i += 2;
          setTimeout(tick, 14);
        } else {
          line += 1;
          setTimeout(typeLine, 260);
        }
      }
      tick();
    }
    typeLine();
  }

  if (term) {
    if (reducedMotion) {
      // no animation: render the finished transcript instantly
      term.textContent = SCRIPT.map(function (s) { return s.text; }).join("");
    } else {
      var started = false;
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !started) {
          started = true;
          typeScript();
          io.disconnect();
        }
      });
      io.observe(term);
    }
  }

  /* ---------- Copy buttons ---------- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy") || "";
      function done(ok) {
        btn.textContent = ok ? "Copied ✓" : "Failed";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { done(true); },
          function () { done(false); }
        );
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          done(true);
        } catch (e) {
          done(false);
        }
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reducedMotion) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          rio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { rio.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
