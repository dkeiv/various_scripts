document.querySelectorAll('form.togglecompletion').forEach(form => {
  if(!isCompleted(form)) {
    form.requestSubmit();
  }
});

function isCompleted(form) {
  const complete = /^complete/i;
  const element = form.firstChild.lastChild.firstChild;
  return complete.test(element.getAttribute('alt'));
}
