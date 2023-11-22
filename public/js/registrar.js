function submitForm() {
  event.preventDefault();
  const button = document.getElementById('registrarButton');
  button.innerText = "Registrando...";
  button.disabled = true;

  // Get form data
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const rut = document.getElementById('rut').value;
  const celular = document.getElementById('celular').value;
  const email = document.getElementById('email').value;
  const patente_particular_1 = document.getElementById('patente_particular_1').value;
  const patente_particular_2 = document.getElementById('patente_particular_2').value;
  const sector_trabajo = document.getElementById('sector_trabajo').value;
  const formData = {
    nombre, apellido, rut, celular, email, patente_particular_1, patente_particular_2, sector_trabajo
  }

  // Make AJAX request using Fetch API
  fetch(`http://localhost:4500/identidad/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
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
    button.innerText = "Registrar";
    button.disabled = false;
  });
}