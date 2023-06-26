import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";
import IdentificationForm from "./IdentificationForm";
import Produit from "./Produit";

const Display_contenu = () => {



    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit,authentificationEnCours} = paramGlobal;
    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};


    return ( 
        <>
            {!authentificationEnCours && <div className="rigth_container_display_affichage">             
                {listeProduit.map((produit)=>{                    
                    //return <Produit key={produit.codeProduit} newProduit={produit}/>
                    return <Produit key={produit._id} newProduit={produit}/>
                })}     
            </div>}
            {authentificationEnCours && <IdentificationForm />}                                 
        </>
     );
}
 
export default Display_contenu;