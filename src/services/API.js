const BASE_URL= "https://https://digi-api.com/api/v1/digimon?pageSize=20&page=0 : https://digi-api.com/api/v1/digimon/agumonapi.api-onepiece.com/v2/characters/en";
export async function getcharacters(){
   try {
    const response = await fetch(`${BASE_URL}/characters/en`);

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}`);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    throw error;
  }
}

