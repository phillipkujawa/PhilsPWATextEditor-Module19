const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Update the install button visibility: show it
    butInstall.classList.toggle('hidden', false);
  });
  
  // Implement a click event handler on the `butInstall` element
  butInstall.addEventListener('click', async () => {
    const deferredPrompt = window.deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      window.deferredPrompt = null;
      butInstall.style.display = 'none';  // hide the button after prompting
    }
  });
  
  // Add a handler for the `appinstalled` event
  window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
  });
  
