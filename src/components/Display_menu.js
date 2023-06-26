import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import model from "../models/models";

const Display_menu = () => {

    const {bd_goodmeal,utilisateur,commande,emptyProduit,article} = model;

/*     const emptyProduit = {
        urlPhoto:'',
        libelleProduit:'',
        prixProduit:'',
        enstock:false,
        avecpublicite:false,
        description:''
    }   */       
    
    //action : addProduct, modifyProduct
    const globalStore = {        
        actionEncours:'',
        produitEncours:{...emptyProduit},
        displayFooter:false
    }

    //action : addProduct, modifyProduct
    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    //const {actionEncours,produitEncours,displayFooter} = paramGlobal;
    
    const valClass = "btn_rigth_container_display_menu";
    const valClass_selected = "btn_rigth_container_display_menu_selected";

/*     const [derouler,setDerouler] = useState(valClass);
    const [ajouter,setAjouter] = useState(valClass);
    const [modifier,setModifier] = useState(valClass); */
    const [action,setAction] = useState({derouler:valClass,ajouter:valClass,modifier:valClass})

    function handleClick(e){
        const targetId = e.target.id;        
        if(targetId.search("derouler") >= 0){
/*             setDerouler(valClass);
            setAjouter(valClass);
            setModifier(valClass); */
            setAction({derouler:valClass,ajouter:valClass,modifier:valClass})
            
            setParamGlobal({...paramGlobal,actionEncours:'',displayFooter:false});
        }        
        if(targetId.search("ajouter") >= 0){            
/*             setDerouler(valClass);
            setAjouter(valClass_selected);
            setModifier(valClass); */
            setAction({derouler:valClass,ajouter:valClass_selected,modifier:valClass})

            setParamGlobal({...paramGlobal,actionEncours:'addProduct',displayFooter:true,produitEncours:emptyProduit});
            
        }
        if(targetId.search("modifier") >= 0){
/*             setDerouler(valClass);
            setAjouter(valClass);
            setModifier(valClass_selected); */
            setAction({derouler:valClass,ajouter:valClass,modifier:valClass_selected})

            setParamGlobal({...paramGlobal,actionEncours:'modifyProduct',displayFooter:true});
        }   
        if(targetId.search("lister") >= 0){
        /*  setDerouler(valClass);
            setAjouter(valClass);
            setModifier(valClass_selected); */
            setAction({derouler:valClass,ajouter:valClass,modifier:valClass,lister:valClass_selected})
        
            setParamGlobal({...paramGlobal,actionEncours:'listerCommande',displayFooter:true});
        }      
    }

    useEffect(() => {
        
    }, []);

    return ( 
        <>
            {paramGlobal.modeEnCours === "admin" && <div className="rigth_container_display_menu">                     
                <div id="derouler1" className={action.derouler+" btn_rigth_container_display_menu"} onClick={(e)=>{handleClick(e)}}>                    
                    <span id="derouler2" className="material-symbols-outlined">expand_more</span>
                </div>
                <div id="ajouter1" className={action.ajouter+" btn_rigth_container_display_menu"} onClick={(e)=>{handleClick(e)}}>
                    <span id="ajouter2" className="material-symbols-outlined">add</span>
                    <span id="ajouter3">Ajouter un produit</span>
                </div>
                <div id="modifier1" className={action.modifier+" btn_rigth_container_display_menu"} onClick={(e)=>{handleClick(e)}}>
                    <span id="modifier2" className="material-symbols-outlined">Edit</span>
                    <span id="modifier3">Modifier un produit</span>
                </div>
                <div id="lister1" className={action.lister+" btn_rigth_container_display_menu"} onClick={(e)=>{handleClick(e)}}>
                    <span id="lister2" className="material-symbols-outlined">shopping_cart</span>
                    <span id="lister3">Lister les commandes</span>
                </div>
            </div>}
        </>

     );
}
 
export default Display_menu;