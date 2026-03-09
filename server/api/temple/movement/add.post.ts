export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log('Adat érkezett:', body);
    
    // Itt küldjük tovább a Discordra vagy mentjük el
    // Egyelőre csak egy sikeres visszajelzést adunk a Grepolisnak
    return { status: 'ok', message: 'Sikerült!' };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Hibás adat formátum',
    });
  }
});