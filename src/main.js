import { getcharacters} from "./services/API.js";
import { afficherCreatures, show,setcreatures } from "../ui.js";
// let data=[]
//  data= await getcharacters()
// console.log(data)
   

try{

const data = await getcharacters();
setcreatures(data);
afficherCreatures(data);
show();

}catch(error){
    console.error(error);
}