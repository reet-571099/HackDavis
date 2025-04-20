import { Workbox } from "workbox-window";

let wb: Workbox | undefined;

if ("serviceWorker" in navigator) {
  wb = new Workbox("/sw.js");

  wb.addEventListener("activated", (event) => {
    if (!event.isUpdate) {
      console.log("Service worker activated for the first time!");
    } else {
      console.log("Service worker activated!");
    }
  });

  wb.addEventListener("waiting", () => {
    if (confirm("A new version is available! Click OK to update.")) {
      wb?.messageSkipWaiting();
    }
  });

  wb.addEventListener("controlling", () => {
    window.location.reload();
  });

  wb.register();
}

export default wb;
