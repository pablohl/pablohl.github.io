(function () {
  "use strict";

  function setupCatalogue() {
    var catalogue = document.querySelector("[data-tool-catalogue]");
    if (!catalogue) return;

    var cards = Array.prototype.slice.call(catalogue.querySelectorAll("[data-tool-card]"));
    var problemButtons = Array.prototype.slice.call(document.querySelectorAll("[data-problem-filter]"));
    var sourceSelect = document.querySelector("[data-source-filter]");
    var clearButton = document.querySelector("[data-clear-filters]");
    var count = document.querySelector("[data-result-count]");
    var empty = document.querySelector("[data-empty-state]");
    var selectedProblem = "all";
    var selectedSource = "all";

    function setProblem(value) {
      selectedProblem = value || "all";
      problemButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.problemFilter === selectedProblem));
      });
    }

    function updateUrl() {
      if (!window.history || !window.history.replaceState) return;
      var params = new URLSearchParams();
      if (selectedProblem !== "all") params.set("problem", selectedProblem);
      if (selectedSource !== "all") params.set("source", selectedSource);
      var query = params.toString();
      window.history.replaceState(null, "", window.location.pathname + (query ? "?" + query : "") + window.location.hash);
    }

    function applyFilters(updateAddress) {
      var visible = 0;
      cards.forEach(function (card) {
        var problems = (card.dataset.problems || "").split(" ");
        var sources = (card.dataset.sources || "").split(" ");
        var matchesProblem = selectedProblem === "all" || problems.indexOf(selectedProblem) !== -1;
        var matchesSource = selectedSource === "all" || sources.indexOf(selectedSource) !== -1;
        card.hidden = !(matchesProblem && matchesSource);
        if (!card.hidden) visible += 1;
      });
      if (count) count.textContent = visible + (visible === 1 ? " tool" : " tools");
      if (empty) empty.hidden = visible !== 0;
      if (updateAddress) updateUrl();
    }

    problemButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setProblem(button.dataset.problemFilter);
        applyFilters(true);
      });
    });

    if (sourceSelect) {
      sourceSelect.addEventListener("change", function () {
        selectedSource = sourceSelect.value;
        applyFilters(true);
      });
    }

    if (clearButton) {
      clearButton.addEventListener("click", function () {
        setProblem("all");
        selectedSource = "all";
        if (sourceSelect) sourceSelect.value = "all";
        applyFilters(true);
      });
    }

    var params = new URLSearchParams(window.location.search);
    var initialProblem = params.get("problem");
    var initialSource = params.get("source");
    if (initialProblem && problemButtons.some(function (button) { return button.dataset.problemFilter === initialProblem; })) {
      setProblem(initialProblem);
    } else {
      setProblem("all");
    }
    var hasInitialSource = sourceSelect && initialSource && Array.prototype.some.call(
      sourceSelect.options,
      function (option) { return option.value === initialSource; }
    );
    if (hasInitialSource) {
      selectedSource = initialSource;
      sourceSelect.value = initialSource;
    }
    applyFilters(false);
  }

  function setupRandomLens() {
    var root = document.querySelector("[data-random-lens]");
    if (!root || !Array.isArray(window.toolboxLenses) || window.toolboxLenses.length === 0) return;

    var question = root.querySelector("[data-lens-question]");
    var name = root.querySelector("[data-lens-name]");
    var source = root.querySelector("[data-lens-source]");
    var link = root.querySelector("[data-lens-link]");
    var button = root.querySelector("[data-lens-refresh]");
    var currentId = root.dataset.initialLens || "";

    function show(lens) {
      currentId = lens.id;
      question.textContent = lens.question;
      name.textContent = lens.name;
      if (source) source.textContent = "From: " + lens.source;
      link.href = lens.url;
      try { window.sessionStorage.setItem("toolbox-last-lens", lens.id); } catch (error) {}
    }

    function pickAnother() {
      var last = currentId;
      try { last = window.sessionStorage.getItem("toolbox-last-lens") || last; } catch (error) {}
      var choices = window.toolboxLenses.filter(function (lens) { return lens.id !== last; });
      if (choices.length === 0) choices = window.toolboxLenses.slice();
      show(choices[Math.floor(Math.random() * choices.length)]);
    }

    button.addEventListener("click", pickAnother);
  }

  setupCatalogue();
  setupRandomLens();
})();
