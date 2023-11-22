function cleanForm() {
  const input = document.getElementById('rut');
  input.value = '';
}

function submitForm() {
  const button = document.getElementById('buscarButton');
  button.innerText = "Verificando...";
  button.disabled = true;

  // Get form data
  const rut = document.getElementById('rut').value;

  // Make AJAX request using Fetch API
  fetch(`http://localhost:4500/identidad/verificar/${rut}`, {
    method: 'GET',
  })
  .then(response => response.text())
  .then(data => {
    console.log(data)
    const objData = JSON.parse(data)
    if (objData.status) {
      successAlert.classList.remove('d-none');
      errorAlert.classList.add('d-none');
    } else {
      successAlert.classList.add('d-none');
      errorAlert.classList.remove('d-none');
    }

    setTimeout(() => {
      successAlert.classList.add('d-none');
      errorAlert.classList.add('d-none');
    }, 3000);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    button.innerText = "Verificar";
    button.disabled = false;
  });
}