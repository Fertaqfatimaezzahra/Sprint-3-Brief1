const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0";
export async function getcharacters(offset = 0) {
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=${offset}`; 
   try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}`);
    }

    const result = await response.json();


   const  newData= result.data.map((ele)=>transformeObj(ele))
   return newData
  } catch (error) {
    throw error;
  }
}
function transformeObj(obj){
   return  {
    id:obj.id  ,

    name: obj.name,

   type: obj.attribute ?? obj.type ?? "Unknown",

    level: obj.level ?? 0,

    stats: { hp:(obj.atk ?? 0) + (obj.def ?? 0), 
        attack:obj.atk ?? 0, 
        defence:obj.def ?? 0},

    image: obj.card_images[0].image_url,

    description: obj.desc
  }
}

