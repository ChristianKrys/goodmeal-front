import { useContext, useEffect } from "react";
import GlobalContext from "../contexts/GlobalContext";
import Article from "./Article";
import model from "../models/models";

const AffichePanier = () => {
    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {baseDeDonnee,actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit,urlServer} = paramGlobal;
    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};
    const {Coll_Produit,Coll_Utilisateur,Coll_Commande} = baseDeDonnee;

    const {bd_goodmeal,utilisateur,commande,emptyProduit,article} = model;


    /*//////////***********
    const emptyProduit = {
        urlPhoto:'',
        libelleProduit:'',
        prixProduit:0,
        enstock:false,
        avecpublicite:false,
        description:'',
        codeProduit:'',
        _id:null
    } 
    const article = {
        quantiteArticle : 0,
        produit : {...emptyProduit},
        montantTotalParArticle : (quantiteArticle,prixProduit)=>{return quantiteArticle*prixProduit}
    }

    const commande = {
        tableArticle : [],
        idClient : 0,
        statutCommande : '',
        dateCommande : null,
        heureCommande : null,
        montantTotalParCommande : (tableArticle)=>{
                let montant = 0;
                tableArticle.forEach(element => {
                    montant += element.montantTotalParArticle(element.quantiteArticle,element.produit.prixProduit);                    
                 });                           
                return montant;        
        },
    }
    ////////*************** */

    const handleViderPanier = ()=>{
        setParamGlobal({...paramGlobal,commandeEnCours : {...commande}})
    }

    function handleValiderCommande(commande){ 
        const url = urlServer+Coll_Commande;//"Commande";          
        fetch(url,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(commande)                    
        })
        .then(response =>{
            //------ Quand la requete est executée ------
            if(!response.ok){
                throw Error('Echec d\'enregistrement de produit !')
            }else{
                console.log('Enregistré avec succès !');
                handleViderPanier();
                alert("Votre commande enregistrée avec succès !!")
            }
        })
        .catch((err)=>{
            //------- Recuperation de message d'erreur -------
            console.log(err.message);                        
        })
    }

    useEffect(() => {
        
    }, []);
    return (         
        <div className="lef_container_middle">                            
            {tableArticle.map((article)=>{
                return <Article key={article.produit._id} newArticle={article}/>                                
            })} 
            {<div onClick={()=>{handleValiderCommande(commandeEnCours)}} className="lef_container_Btn_valider_commande">Valider la commande</div>}
            {<div onClick={handleViderPanier} className="lef_container_Btn_vider_panier">Vider le panier</div>}
        </div> 
     );
}

 
export default AffichePanier;