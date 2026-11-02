const SHEET_ID = '10n7eRY2DIquj9RaZYINpJQJxDYySRFL6bGZ8ae5gQxQ';
const SHEET_NAME = 'Respuestas';
const HEADERS = ['fecha', 'sesion', 'canal', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9_ubicacion', 'p10_edad', 'trabaja_salud'];

function guardar(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  sh.appendRow(HEADERS.map(h => data[h] !== undefined ? data[h] : ''));
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    guardar(JSON.parse(e.postData.contents));
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('Funciona. Este link recibe las respuestas de la encuesta.');
}

function probar() {
  guardar({ fecha: new Date().toISOString(), sesion: 'PRUEBA', canal: 'test', p1: 'Sí' });
}
