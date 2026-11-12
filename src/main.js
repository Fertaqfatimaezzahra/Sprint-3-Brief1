import { getcharacters} from "./services/API.js";
import { afficherCreatures, show } from "../ui.js";
let data=[]
 data= await getcharacters()
console.log(data)
afficherCreatures(data)   
show()
