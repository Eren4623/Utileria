/**
 * Valida si un string tiene formato valido de correo electronico.
 * @param {string} correo
 * @returns {boolean}
 */
function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

/**
 * Valida que una cadena contenga exclusivamente letras (mayusculas, minusculas y acentuadas).
 * @param {string} texto
 * @returns {boolean}
 */
function soloLetras(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

/**
 * Valida que la cantidad de dígitos de un número no sobrepase la longitud máxima.
 * @param {number|string} numero
 * @param {number} maxLongitud
 * @returns {boolean}
 */
function validarLongitud(numero, maxLongitud) {
    const strNum = String(numero).trim();
    return strNum.length > 0 && strNum.length <= maxLongitud && !isNaN(strNum);
}

/**
 * Calcula la edad exacta en años a partir de una fecha de nacimiento (YYYY-MM-DD).
 * @param {string|Date} fechaNacimiento
 * @returns {number}
 */
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const cumple = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumple.getFullYear();
    const mes = hoy.getMonth() - cumple.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) {
        edad--;
    }
    return edad;
}

/**
 * Determina si la persona es mayor de 18 años.
 * @param {string|Date} fechaNacimiento
 * @returns {boolean}
 */
function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

/**
 * Valida que la contraseña cumpla con: mín. 8 caracteres, al menos una mayúscula,
 * una minúscula, un número y un carácter especial.
 * @param {string} password
 * @returns {boolean}
 */
function validarPassword(password) {
    // Al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 dígito y 1 símbolo
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
}

// --- Funciones Adicionales (Sección Libre) ---

/**
 * Valida si un string contiene un número telefónico estándar de 10 dígitos.
 * @param {string} telefono
 * @returns {boolean}
 */
function validarTelefono(telefono) {
    const regex = /^\d{10}$/;
    return regex.test(String(telefono).trim());
}

/**
 * Convierte un número en formato monetario estándar (MXN).
 * @param {number} monto
 * @returns {string}
 */
function formatearMoneda(monto) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monto);
}