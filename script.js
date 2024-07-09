const textArea = document.getElementById("inputText");
const titleDialog = document.getElementById("titleDialog");
const btnEncriptar = document.getElementById("encriptar");
const btnDesencriptar = document.getElementById("desencriptar");
const dialog = document.getElementById("dialog");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const pass = document.getElementById("pass");
var modo = "";
var passUser = null;
var textDesbloqueado = null;

function openDialog(v) {
  dialog.style.display = "flex";
  modo = v;
  if (v == "e") {
    titleDialog.innerHTML = "Asignar Contraseña";
  } else {
    titleDialog.innerHTML = "Ingresar Contraseña";
  }
}

function closeDialog(event) {
  event.preventDefault();
  dialog.style.display = "none";
}

function save(event) {
  event.preventDefault();
  if (modo == "e") {
    let valorAEncriptar = inputText.value + "passwordEncript5153134878371='" + pass.value + "'";
    outputText.value = encryptText(valorAEncriptar);
    dialog.style.display = "none";
    pass.value = "";
    inputText.value = "";
    checkButtons();
  } else {
    let decryptedText = decryptText(inputText.value);
    let extractedPassword = extractPassword(decryptedText);
    if (pass.value === extractedPassword) {
      outputText.value = removePassword(decryptedText);
      dialog.style.display = "none";
      pass.value = "";
    } else {
      alert("Contraseña incorrecta");
    }
  }
}

function encryptText(v) {
  let encryptedText = "";
  for (let i = 0; i < v.length; i++) {
    encryptedText += String.fromCharCode(v.charCodeAt(i) + 3);
  }
  return encryptedText;
}

function decryptText(v) {
  let decryptedText = "";
  for (let i = 0; i < v.length; i++) {
    decryptedText += String.fromCharCode(v.charCodeAt(i) - 3);
  }
  return decryptedText;
}

function extractPassword(text) {
  const startWord = "passwordEncript5153134878371='";
  const endWord = "'";
  const match = text.match(new RegExp(`${startWord}(.*?)${endWord}`));
  return match ? match[1] : null;
}

function removePassword(text) {
  const phrase = "passwordEncript5153134878371='";
  const index = text.indexOf(phrase);
  return index !== -1 ? text.substring(0, index) : text;
}

function checkButtons() {
  let resul = decryptText(inputText.value);
  passUser = extractPassword(resul);
  textDesbloqueado = removePassword(resul);

  if (resul.includes("passwordEncript5153134878371")) {
    btnEncriptar.disabled = true;
    btnEncriptar.style.opacity = "0.5";
    btnDesencriptar.disabled = false;
    btnDesencriptar.style.opacity = "1";
  } else {
    btnEncriptar.disabled = false;
    btnEncriptar.style.opacity = "1";
    btnDesencriptar.disabled = true;
    btnDesencriptar.style.opacity = "0.5";
  }

  if (inputText.value.length < 1) {
    btnEncriptar.disabled = false;
    btnEncriptar.style.opacity = "1";
    btnDesencriptar.disabled = true;
    btnDesencriptar.style.opacity = "0.5";
  }
}

textArea.addEventListener("input", checkButtons);

function copyToClipboard() {
  const textarea = document.getElementById('outputText');
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  document.execCommand('copy');
  alert("Texto copiado");
}
