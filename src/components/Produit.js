import { useContext, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import model from "../models/models";

const Produit = ({newProduit}) => {

    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {baseDeDonnee,actionEncours,modeEnCours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit,urlServer} = paramGlobal;
    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};
    const {Coll_Produit,Coll_Utilisateur,Coll_Commande} = baseDeDonnee;

    const {bd_goodmeal,utilisateur,commande,emptyProduit,article} = model;

/*     const emptyProduit = {
        urlPhoto:'',
        libelleProduit:'',
        prixProduit:0,
        enstock:false,
        avecpublicite:false,
        description:'',
        codeProduit:''
    } */

    const [copyNewProduit,setCopyNewProduit] = useState({...emptyProduit,...newProduit});
    const [supprimerProduit,setSupprimerProduit] = useState(false);

    const handleClickAjouter = ()=>{

        if(copyNewProduit.enstock === false) return

        const article = {
            quantiteArticle : 1,
            produit : {...copyNewProduit},
            montantTotalParArticle : (quantiteArticle,prixProduit)=>{return quantiteArticle*prixProduit}
        }

        let copyTableArticle = [...tableArticle];

        let quantiteArticle = 0;
        let indexArticle = -1;
        tableArticle.forEach((element,index) => {
            if(element.produit._id === copyNewProduit._id){
                //------ verification de la présence de articleEnEntree dans commandeEnCours
                quantiteArticle = element.quantiteArticle;
                //indexArticle += 1;
                indexArticle = index;                
            }
        });        

        if(indexArticle > -1){
            //----- articleEnEntree est dejà présent dans commandeEnCours --------                      
            copyTableArticle[indexArticle].quantiteArticle = quantiteArticle + 1;             
        } else{
            //---- article non présent dans la commande, on l'insère dans la liste de commande ---------
            copyTableArticle.push(article);
        } ;
        
        const updateCommande = {...commandeEnCours,tableArticle:[...copyTableArticle]};
        setParamGlobal({...paramGlobal,commandeEnCours:{...updateCommande}})                
    }

    function supprimeProduct(product){ 
        let suppressionReussie = true;
        const id = product._id;
        const url = urlServer+Coll_Produit+"/"+id//"Produit/"+id;          
        fetch(url,{
            method: 'DELETE',                  
        })
        .then(response =>{
            //------ Quand la requete est executée ------
            if(!response.ok){
                throw Error('Echec de suppression de produit !')
                suppressionReussie = false;
            }else{
                console.log('Supprimé avec succès !');                
                setParamGlobal({...paramGlobal,produitEncours:emptyProduit});
            }
        })
        .catch((err)=>{
            //------- Recuperation de message d'erreur -------
            console.log(err.message);                        
        })
        return suppressionReussie;
    }


    const handleSupprimeProduit = ()=>{
        
        if(!supprimeProduct(copyNewProduit)) return;

        //let confirmSupp = confirm("Voulez-vous vraiment supprimer cet article de la boutique ?");
        //---- Suppression de l'élément dans la commande en cours ---------
        const newtableArticle = tableArticle.filter((element)=>element.produit._id !== copyNewProduit._id);
        const updateCommande = {...commandeEnCours,tableArticle:[...newtableArticle]};
        
        //---- Suppression de l'élément dans la liste des Produits en cours ---------        
        const newlisteProduit = listeProduit.filter((element)=>element._id !== copyNewProduit._id);
                    
        setParamGlobal({...paramGlobal,commandeEnCours:{...updateCommande},listeProduit:[...newlisteProduit]}) ;
        
        //---- Suppression de l'élément dans la base de données des Produits ---------
        
        
        //------ Raffraichir l'affichage ---------------
        setSupprimerProduit(true);
    
        //------ Abandon de suppression ----------------
        
    }  
    
    const handleProduitEncours = ()=>{
        if(modeEnCours === "admin") setParamGlobal({...paramGlobal,produitEncours:{...copyNewProduit}})
    }

    return ( !supprimerProduit &&
        <div onClick={handleProduitEncours} className={copyNewProduit.enstock ?"produit":"produit assombrir"}>
            <div className="produit_top">
                <div className="produit_top_image"><img src={copyNewProduit.urlPhoto} alt="" /></div>
                {(paramGlobal.modeEnCours === "admin" ) && <div className="produit_top_Btn_Supprimer" onClick={handleSupprimeProduit}>X</div>}
                <div className="produit_top_bande_Nouveau"><img src={copyNewProduit.avecpublicite ? "images/new.png" : ""} alt="" /></div>
                <div className="produit_top_bande_Epuise"><img src={copyNewProduit.enstock ? "" : "images/epuise1.png"} alt="" /></div>
            </div>
            <div className="produit_libelle">{copyNewProduit.libelleProduit}</div>
            <div className="produit_bottom">
                <div className="produit_bottom_prix">{copyNewProduit.prixProduit+" "+devise}</div>
                <div className="produit_bottom_Btn_Ajouter" onClick={handleClickAjouter}>Ajouter</div>
            </div>
        </div>
     );
}
 
export default Produit;