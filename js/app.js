const toastMsg = (msg) => {
  return M.toast({
    html: `<h6>${msg}</h6>`,
    classes: 'rounded deep-purple darken-2 toast-msg',
    displayLength: 1500,
  });
};
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => toastMsg('Ready for offline mode!'))
    .catch(() => toastMsg('Lack of browser support :/'));
} else {
  toastMsg('Lack of browser support :/');
}
