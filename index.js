const mineflayer = require('mineflayer');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const bot = mineflayer.createBot({
  host: 'monyxmc.net',
  port: 25565,
  username: 'StrawberryAlt',
  auth: 'offline',
  version: '1.20.1'
});

bot.on('login', () => {
  console.log('✅ Bot berhasil login ke server.');
});

bot.on('spawn', async () => {
  console.log("✅ Bot berhasil spawn, menunggu 2 detik...");
  await delay(2000);
  bot.chat('/login Selaa123');
  console.log("✅ Mengirim /login...");

  await delay(4000); // Tunggu hotbar muncul

  // Buka server selector (misal slot 0)
  const hotbarItem = bot.inventory.slots[36]; // slot 0 di hotbar
  if (hotbarItem) {
    bot.activateItem();
    console.log("📦 Server selector diaktifkan.");
  } else {
    console.log("⚠️ Item selector tidak ditemukan.");
    return;
  }

  await delay(3000); // Tunggu menu muncul

  // Klik slot 12 (SMP S2)
  bot.once('windowOpen', async (window) => {
    const item = window.slots[12];
    if (item) {
      bot.clickWindow(12, 0, 0);
      console.log("🛶 Menu SMP S2 diklik.");
    } else {
      console.log("❌ Slot 12 tidak ditemukan.");
    }
  });

  // Setelah masuk dunia, delay 4 detik dan klik kanan sekali
  bot.once('spawn', async () => {
    await delay(4000);
    bot.activateItem();
    console.log("✅ Klik kanan dilakukan untuk AFK.");
  });
});

bot.on('end', () => {
  console.log("🔌 Bot terputus dari server.");
});

bot.on('error', (err) => {
  console.error("❌ Error:", err);
});