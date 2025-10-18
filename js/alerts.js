/* Lightweight custom alerts (toasts + confirm modal)
   Exposes window.alerts.toast(type, message, options)
   and window.alerts.confirm(options)
*/
(function () {
  if (window.alerts) return;

  // inject toast container
  function ensureContainer() {
    let c = document.getElementById("customToasts");
    if (!c) {
      c = document.createElement("div");
      c.id = "customToasts";
      c.style.position = "fixed";
      c.style.right = "20px";
      c.style.top = "20px";
      c.style.zIndex = 2000;
      c.style.display = "flex";
      c.style.flexDirection = "column";
      c.style.gap = "10px";
      document.body.appendChild(c);
    }
    return c;
  }

  function createToast(type, message, timeout = 3500) {
    const container = ensureContainer();
    const el = document.createElement("div");
    el.className = "custom-toast " + (type || "info");
    el.style.minWidth = "260px";
    el.style.padding = "12px 14px";
    el.style.borderRadius = "8px";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.gap = "10px";
    el.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
    el.style.color = "#fff";
    el.style.fontWeight = "500";
    el.style.cursor = "default";
    // icon
    const icon = document.createElement("div");
    icon.className = "toast-icon";
    icon.style.fontSize = "18px";
    // message
    const msg = document.createElement("div");
    msg.innerHTML = message;
    msg.style.flex = "1";
    // close btn
    const close = document.createElement("button");
    close.innerHTML = "&times;";
    close.style.background = "transparent";
    close.style.border = "none";
    close.style.color = "inherit";
    close.style.fontSize = "18px";
    close.style.cursor = "pointer";

    if (type === "success") {
      el.style.background = "var(--color-orange)";
      icon.textContent = "✅";
    } else if (type === "error") {
      el.style.background = "#dc2626";
      icon.textContent = "❌";
    } else if (type === "warning") {
      el.style.background = "#f59e0b";
      icon.textContent = "⚠️";
    } else {
      el.style.background = "#374151";
      icon.textContent = "ℹ️";
    }

    el.appendChild(icon);
    el.appendChild(msg);
    el.appendChild(close);
    container.appendChild(el);

    const remover = () => {
      try {
        el.remove();
      } catch (e) {}
    };
    const timer = setTimeout(remover, timeout);
    close.addEventListener("click", () => {
      clearTimeout(timer);
      remover();
    });
    return { remove: remover };
  }

  function showConfirm(options) {
    // options: title, message, confirmText, cancelText, onConfirm, onCancel
    const o = Object.assign(
      {
        title: "Confirm",
        message: "",
        confirmText: "Confirm",
        cancelText: "Cancel",
      },
      options || {}
    );
    // create modal overlay
    const overlay = document.createElement("div");
    overlay.className = "custom-confirm-overlay";
    overlay.style =
      "position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:2050;";
    const dlg = document.createElement("div");
    dlg.className = "custom-confirm-dialog";
    dlg.style =
      "background:#fff;padding:20px;border-radius:10px;max-width:420px;width:90%;box-shadow:0 8px 30px rgba(0,0,0,0.12);font-family:inherit;color:#111;";
    dlg.innerHTML = `<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;"><div style="font-size:24px">⚠️</div><div><strong style="font-size:18px">${o.title}</strong><div style="color:#6b7280;font-size:14px;margin-top:6px">${o.message}</div></div></div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;"><button class="btn-cancel" style="background:#f3f4f6;border:none;padding:8px 12px;border-radius:6px;">${o.cancelText}</button><button class="btn-confirm" style="background:var(--color-orange);color:#fff;border:none;padding:8px 12px;border-radius:6px;">${o.confirmText}</button></div>`;
    overlay.appendChild(dlg);
    document.body.appendChild(overlay);
    const cleanup = () => {
      try {
        overlay.remove();
      } catch (e) {}
    };
    dlg.querySelector(".btn-cancel").addEventListener("click", () => {
      cleanup();
      if (typeof o.onCancel === "function") o.onCancel();
    });
    dlg.querySelector(".btn-confirm").addEventListener("click", () => {
      cleanup();
      if (typeof o.onConfirm === "function") o.onConfirm();
    });
    return overlay;
  }

  window.alerts = {
    toast: function (type, message, opts) {
      return createToast(
        type,
        message,
        opts && opts.timeout ? opts.timeout : 3500
      );
    },
    confirm: function (opts) {
      return showConfirm(opts);
    },
  };
})();
