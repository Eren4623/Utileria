/* ==========================================================================
   PARTE OBLIGATORIA: LAS 6 FUNCIONES
   ========================================================================== */

/**
 * Valida formato de correo electrónico estándar.
 * @param {string} correo
 * @returns {boolean}
 */
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

/**
 * Solo letras mayúsculas/minúsculas, acepta vocales acentuadas, diéresis y la letra ñ.
 * @param {string} texto
 * @returns {boolean}
 */
function soloLetras(texto) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
  return regex.test(texto);
}

/**
 * Valida la cantidad máxima de dígitos o caracteres de un número.
 * @param {number|string} numero
 * @param {number} maxLongitud
 * @returns {boolean}
 */
function validarLongitud(numero, maxLongitud) {
  const cadena = String(numero).replace('-', '').trim();
  return cadena.length <= maxLongitud && cadena.length > 0;
}

/**
 * Calcula la edad en años a partir de una fecha de nacimiento.
 * @param {string|Date} fechaNacimiento
 * @returns {number}
 */
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();

  const mesNac = fechaNac.getMonth();
  const diaNac = fechaNac.getDate();

  // Restar un año si aún no ha cumplido en el mes o día presente
  if (mesActual < mesNac || (mesActual === mesNac && diaActual < diaNac)) {
    edad--;
  }

  return edad;
}

/**
 * Valida si la persona es mayor de edad (mínimo 18 años cumplidos).
 * @param {string|Date} fechaNacimiento
 * @returns {boolean}
 */
function esMayorDeEdad(fechaNacimiento) {
  return calcularEdad(fechaNacimiento) >= 18;
}

/**
 * Valida contraseña: requiere mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres.
 * @param {string} password
 * @returns {boolean}
 */
function validarPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}


/* ==========================================================================
   LÓGICA ESPECÍFICA PARA CADA PÁGINA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Manejador común del botón para mostrar/ocultar contraseña
  const togglePassBtn = document.getElementById('toggle-password');
  const inputPass = document.getElementById('password');

  if (togglePassBtn && inputPass) {
    togglePassBtn.addEventListener('click', () => {
      const tipo = inputPass.getAttribute('type') === 'password' ? 'text' : 'password';
      inputPass.setAttribute('type', tipo);
      togglePassBtn.textContent = tipo === 'password' ? '👁️' : '🔒';
    });
  }

  // -------------------------------------------------------------------------
  // FLUJO DE INICIO DE SESIÓN (login.html)
  // -------------------------------------------------------------------------
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      limpiarErrores();
      ocultarAlerta();

      const correo = document.getElementById('correo').value.trim();
      const pass = inputPass.value;
      let esValido = true;

      // Validación de Correo con función requerida
      if (!correo) {
        mostrarError('error-correo', 'El correo electrónico es requerido.');
        esValido = false;
      } else if (!validarCorreo(correo)) {
        mostrarError('error-correo', 'El formato del correo no es válido.');
        esValido = false;
      }

      // Validación de contraseña ingresada
      if (!pass) {
        mostrarError('error-password', 'La contraseña es requerida.');
        esValido = false;
      }

      if (esValido) {
        mostrarAlerta(`¡Inicio de sesión exitoso! Bienvenido/a al sistema.`, 'exito');
      }
    });
  }

  // -------------------------------------------------------------------------
  // FLUJO DE FORMULARIO DE REGISTRO (registro.html)
  // -------------------------------------------------------------------------
  const registroForm = document.getElementById('registro-form');
  if (registroForm) {
    // Guía interactiva de la contraseña en tiempo real
    inputPass.addEventListener('input', () => {
      const val = inputPass.value;
      marcarRequisito('req-min8', val.length >= 8);
      marcarRequisito('req-mayus', /[A-Z]/.test(val));
      marcarRequisito('req-minus', /[a-z]/.test(val));
      marcarRequisito('req-num', /\d/.test(val));
      marcarRequisito('req-especial', /[\W_]/.test(val));
    });

    registroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      limpiarErrores();
      ocultarAlerta();

      const nombre = document.getElementById('nombre').value.trim();
      const apellido = document.getElementById('apellido').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const fecha = document.getElementById('fecha-nacimiento').value;
      const pass = inputPass.value;
      let esValido = true;

      // 1. Validar Nombre
      if (!nombre) {
        mostrarError('error-nombre', 'El nombre es obligatorio.');
        esValido = false;
      } else if (!soloLetras(nombre)) {
        mostrarError('error-nombre', 'El nombre solo debe incluir letras.');
        esValido = false;
      }

      // 2. Validar Apellido
      if (!apellido) {
        mostrarError('error-apellido', 'El apellido es obligatorio.');
        esValido = false;
      } else if (!soloLetras(apellido)) {
        mostrarError('error-apellido', 'El apellido solo debe incluir letras.');
        esValido = false;
      }

      // 3. Validar Correo
      if (!correo) {
        mostrarError('error-correo', 'El correo electrónico es obligatorio.');
        esValido = false;
      } else if (!validarCorreo(correo)) {
        mostrarError('error-correo', 'Ingresa una dirección de correo válida.');
        esValido = false;
      }

      // 4. Validar Fecha y Mayoría de Edad
      if (!fecha) {
        mostrarError('error-fecha', 'Selecciona tu fecha de nacimiento.');
        esValido = false;
      } else if (!esMayorDeEdad(fecha)) {
        const edad = calcularEdad(fecha);
        mostrarError('error-fecha', `Debes ser mayor de edad (+18). Tu edad actual es: ${edad} año(s).`);
        esValido = false;
      }

      // 5. Validar Contraseña estricta
      if (!pass) {
        mostrarError('error-password', 'La contraseña es obligatoria.');
        esValido = false;
      } else if (!validarPassword(pass)) {
        mostrarError('error-password', 'La contraseña debe cumplir con todos los requisitos solicitados.');
        esValido = false;
      }

      if (esValido) {
        mostrarAlerta(`¡Cuenta registrada con éxito para ${nombre} ${apellido}!`, 'exito');
        registroForm.reset();
        ['req-min8', 'req-mayus', 'req-minus', 'req-num', 'req-especial'].forEach(id => {
          marcarRequisito(id, false);
        });
      }
    });
  }
});

/* Funciones auxiliares de UI */
function mostrarError(id, mensaje) {
  const elemento = document.getElementById(id);
  if (elemento) elemento.textContent = mensaje;
}

function limpiarErrores() {
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
}

function mostrarAlerta(mensaje, tipo) {
  const alerta = document.getElementById('alerta-box');
  if (alerta) {
    alerta.textContent = mensaje;
    alerta.className = `alerta ${tipo}`;
    alerta.classList.remove('oculta');
  }
}

function ocultarAlerta() {
  const alerta = document.getElementById('alerta-box');
  if (alerta) {
    alerta.className = 'alerta oculta';
    alerta.textContent = '';
  }
}

function marcarRequisito(id, cumple) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('valido', cumple);
}