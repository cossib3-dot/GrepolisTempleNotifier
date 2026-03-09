export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    // IDE MÁSOLD BE A DISCORD WEBHOOK URL-EDET
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1480579260178759984/XGWZ1oAL8G3dph4eKfCgBeJYR5lOeD3v_8OP8w4tnKqS76UFdyWVjeYHSOZOX4w9_v_o';

    // Formázzuk az üzenetet, hogy szépen nézzen ki Discordon
    const message = {
      embeds: [{
        title: "🚨 Új mozgás észlelve!",
        color: 16711680, // Piros szín
        fields: [
          { name: "Templom", value: body.templeName || "Ismeretlen", inline: true },
          { name: "Típus", value: body.type || "Ismeretlen", inline: true },
          { name: "Érkezés", value: body.arrivalTime || "Most", inline: false }
        ],
        footer: { text: "Grepolis Temple Notifier" },
        timestamp: new Date()
      }]
    };

    // Küldés a Discordra
    await $fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      body: message
    });

    return { status: 'ok', message: 'Discord üzenet elküldve!' };

  } catch (error) {
    console.error('Hiba:', error);
    throw createError({
      statusCode: 400,
      statusMessage: 'Nem sikerült a Discord küldés',
    });
  }
});