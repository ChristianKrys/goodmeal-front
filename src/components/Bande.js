import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";

const Bande = ({position}) => {
    
    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours} = paramGlobal;    
    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};

    const montantTotalParCommande = commandeEnCours.montantTotalParCommande(tableArticle);
    
    const [bande,setBande] = useState(position);
    const [facture,setFacture] = useState(montantTotalParCommande);

    const top_band = (
        <div className="lef_container_top">
            <div className="lef_container_top_lib">TOTAL : </div>               
            <div className="lef_container_top_total">{facture+" "+devise}</div>
            <span className="material-symbols-outlined">shopping_cart</span>            
        </div>);

    const bottom_band = (
        <div className="lef_container_bottom">
            <div className="lef_container_bottom_message">Bonnne réjouissance !!!</div>
            <div className="lef_container_bottom_design_by"><small>Designed by eencsoft</small></div>
        </div>
    )
 

    useEffect(() => {
        setBande(position); 
        setFacture(montantTotalParCommande);        
                
    }, [paramGlobal]);

    return ( 
        <>
            {bande==='top' && top_band}
            {bande==='bottom' && bottom_band}         
        </>        
     );
}
 
export default Bande;