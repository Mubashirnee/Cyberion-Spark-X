

















const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0p4RGFmYXVkVWp5ek5DWEJ3bDVHcFBURlNxU3Y5SnZnbnFaVHVpMW1XZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejVSOWp2YjZJSjhVSkp4QitZdUI4NFZIbE5FSi81SVhmYm5HSEozTzdsVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySkpFcmZNclZZR281M09zUldTV2o4VEM2WXNjWmJ5cWZ4K3diMVVkZ0U0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBVGVHd1pCSmpvSUxwYVlEbFpFV2ExRXNRUFVKcGloVWdUWkhGZkdRcDF3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlIcDdMQzZaaEJQSy9pWG1JdU9lTXlDVmpZQWptdlg1OWUvaDhZMTFMWEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVsOHFndU1DakV5RW5EUXN1K1RyYnNkMzJzMHNiUXQxd3Exb0pNUnBTRGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUFHMkhYQ1N3WGpldHdMTGI2K0ErY0FlZ29uREw4NlN3NkVWdVN4a2RFND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFhiMnRpdXJIN3dZSlMyckZ2K3JpWWVCeHhlNzlyd25lQnlOU0FOSk5GOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5pRmtiaXA1cW9iaUdDYW9YRENXWkF4UDlCNkt4SHYvcVBLQkhZZlo4aU1zRkJrKzRXYmgxQXduTngxclhXQmYweFdzQnl0SVRJcHNrUjZOVjluY0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ3LCJhZHZTZWNyZXRLZXkiOiIydHR1cU15UnNtSCtzWGJPS0RsSGlzbVV2RkJaWkZ2bU1KaXlQazlWYTJBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzI5NzY3OTA3M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzNURBNzQ1RjBFOUFFNUNERTlCMUNGMEJDQTFDRjQ0MyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI3MTE4MjYwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI4NTlXdjJFZFRPdVN6OW5JSDBoZ2Z3IiwicGhvbmVJZCI6IjAyMDUyYWJjLTI4MTItNDIwMS1hY2YwLTk4MGJkMzNiNzdkZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQXJkOGE0NmVnUHI2S1VTQkhYTFppamZoUms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidTkvRUl4NlJxYTlqaVNmU2xZL1FIRzdtUVpVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik5WQVdQREJUIiwibWUiOnsiaWQiOiI5MjMyOTc2NzkwNzM6MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLZhdmO2YDZgNmA2YDZgNmT2YDZhNmO2KfZsNim2ZDZgNmA2YDaqdmO2YDZgNmw2YDZgNmA24HZsNicIPCThqog44CGzY7LkM2iwrtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICAgID7wnZ+R2KfZhtiz2YDYp9im24zZgNqIIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPekRwbE1Rby9mR3R3WVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI3RWlENkMrSlRoZ2ZyeXJhT2tkODd3bVViTk9mZnFkREZFVlk3bEdyUVY4PSIsImFjY291bnRTaWduYXR1cmUiOiJ0MFJ6NWVrT0I4V2RLTVNtNnJyd1NQY3lpMjRWL2xVU3BXRmNiL2hGaVdFL0p5N1BUNkNxMWhVbkthanNJV0s1ZWsvV1ZjYitVNG5RRDBQZlVyVzNBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUlh2OStDSERuY1RKelp2Q1E2anRyZXh5QThWRDA4VER1MGhJK3VEUEJRSTV4Q1hLbXhpcVM1YitDbTZuL2FlWDBvQXJMcDVUQnBoZDV4MFkzYk1VQ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMyOTc2NzkwNzM6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJleElnK2d2aVU0WUg2OHEyanBIZk84SmxHelRuMzZuUXhSRldPNVJxMEZmIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3MTE4MjU2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVAwKyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "||•MUBASHIR RAJPUT•||🖤🥀",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " +923097836070",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '🤨مطـ᪳ـ͢ـــلوبــّْ͢ـْـْــؔـہ لـ᪳ـ͢ـــڑکـ᪳ـ͢ـــی آپـ᪳ـ͢ـــکی اوقـ᪳ـ͢ـــات سـ᪳ـ͢ـــے باہـ᪳ـ͢ـــر ہــّْ͢ـْـْــؔـے 👑👻🔥 ',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/b41oqk.mp4',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

