// Charge content/data.json et remplit toutes les pages du site.
(function () {
  function renderStats(data) {
    document.querySelectorAll('[data-r="stats"]').forEach(function (container) {
      container.innerHTML = "";
      data.stats.forEach(function (s) {
        var div = document.createElement("div");
        div.className = "stat";
        div.innerHTML = '<b>' + s.value + '</b><span>' + s.label + '</span>';
        container.appendChild(div);
      });
    });
  }

  function renderSkills(data) {
    document.querySelectorAll('[data-r="skills"]').forEach(function (container) {
      container.innerHTML = "";
      data.skills.forEach(function (s) {
        var div = document.createElement("div");
        div.className = "skill-card";
        div.innerHTML = '<div class="ic">' + s.icon + '</div><h3>' + s.title + '</h3><p>' + s.desc + '</p>';
        container.appendChild(div);
      });
    });
  }

  function renderProjects(data) {
    document.querySelectorAll('[data-r="projects"]').forEach(function (container) {
      var limit = parseInt(container.getAttribute("data-limit") || "0", 10);
      var list = limit ? data.projects.slice(0, limit) : data.projects;
      container.innerHTML = "";
      list.forEach(function (p) {
        var div = document.createElement("div");
        div.className = "proj-card";
        div.innerHTML = '<div class="img">' + p.icon + '</div><div class="body"><span class="tag">' + p.tag +
          '</span><h3>' + p.title + '</h3><p>' + p.desc + '</p></div>';
        container.appendChild(div);
      });
    });
  }

  function renderText(data) {
    var map = {
      name: data.name,
      title: data.title,
      tagline: data.tagline,
      phone: data.phone,
      email: data.email,
      location: data.location
    };
    Object.keys(map).forEach(function (key) {
      document.querySelectorAll('[data-r="' + key + '"]').forEach(function (el) {
        el.textContent = map[key];
      });
    });
  }

  function renderAvatar(data) {
    document.querySelectorAll('[data-r="avatar"]').forEach(function (el) {
      if (data.avatar) {
        el.innerHTML = '<img src="' + data.avatar + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
      }
    });
  }

  function renderWhatsapp(data) {
    document.querySelectorAll('[data-r="wa-link"]').forEach(function (el) {
      var msg = el.getAttribute("data-msg") || "Bonjour, je voudrais plus d'informations.";
      msg = msg.replace("{name}", data.name);
      el.setAttribute("href", "https://wa.me/" + data.whatsapp_number + "?text=" + encodeURIComponent(msg));
    });
    window.SITE_WA_NUM = data.whatsapp_number;
    window.SITE_EMAIL = data.email;
  }

  fetch("content/data.json")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      renderText(data);
      renderAvatar(data);
      renderStats(data);
      renderSkills(data);
      renderProjects(data);
      renderWhatsapp(data);
      document.dispatchEvent(new CustomEvent("siteDataReady", { detail: data }));
    })
    .catch(function (err) { console.error("Erreur de chargement du contenu:", err); });
})();
