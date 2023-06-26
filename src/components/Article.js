import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import model from "../models/models";

const Article = ({newArticle}) => {

    //------ Prend en entrée un article du panier, l'affiche et modifie l'état du panier dans paramGlobal ----
    
    const {bd_goodmeal,utilisateur,commande,emptyProduit,article} = model;
/*
    const emptyProduit = {
        urlPhoto:'images/frite.jpg',
        libelleProduit:'NEW YORK FRITS',
        prixProduit:3.10,
        enstock:true,
        avecpublicite:true,
        description:'Les frites de New York',
        codeProduit:''
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
            return ()=>{
                let montant = 0;
                tableArticle.forEach(element => {montant += element.montantTotalParArticle; });                
                return montant;
            }
        },
    }
    */

    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours} = paramGlobal;
    const [articleEnCours,setAaticleEnCours] = useState({...article,...newArticle});
    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};

    const [quantiteArticleEnCours,setQuantiteArticleEnCours] = useState({quantie:0,index:-1});
    
    function handleQuantiteArticleEnCours(type){
        
        let quantie = quantiteArticleEnCours.quantie
        let index = quantiteArticleEnCours.index

        //------ type=1 augmenter sinon diminuer ----------
        if(type===1) 
        {
            quantie += 1;
            setQuantiteArticleEnCours({quantie:quantie,index:index});             
        }
        if(type===-1){
            quantie -= 1;
            quantie = quantie > 0  ? quantie : 0;
            setQuantiteArticleEnCours({quantie:quantie,index:index});
        }        

        if(index > -1){            
            tableArticle[index].quantiteArticle = quantie;
            const tableArticleFiltree = tableArticle.filter((elt)=>elt.quantiteArticle > 0 )
            let updateCommande = {...commande};
            updateCommande = {...commandeEnCours,tableArticle:[...tableArticleFiltree]};
            setParamGlobal({...paramGlobal,commandeEnCours:{...updateCommande}})                       
        }

    }
    
    useEffect(() => {
        
        if(articleEnCours.produit._id === ''){return}    
        
        let quantiteArticle = 0;
        let indexArticle = -1;
        tableArticle.forEach((element,index) => {
            if(element.produit._id === articleEnCours.produit._id){
                //------ verification de la présence de articleEnEntree dans commandeEnCours
                quantiteArticle += element.quantiteArticle;
                //indexArticle += 1;
                indexArticle = index;
            }
        });
        
        if(indexArticle > -1){
            //----- articleEnEntree est dejà présent dans commandeEnCours --------            
            setQuantiteArticleEnCours({quantie:quantiteArticle,index:indexArticle});                       
        } else{
            setQuantiteArticleEnCours({quantie:1,index:-1});
        } ;
            
    }, [paramGlobal]);

    return ( 
        ((articleEnCours.produit._id!=='') && (quantiteArticleEnCours.quantie > 0) &&
        <div className="article">            
            <div className="article_image"><img src={articleEnCours.produit.urlPhoto} alt="" /></div>
            <div className="article_middle">
                <div className="article_middle_libelle">{articleEnCours.produit.libelleProduit}</div>
                <div className="article_middle_price">{articleEnCours.produit.prixProduit+" "+devise}</div>
            </div>
            <div className="article_left">
                <span onClick={()=>{handleQuantiteArticleEnCours(1)}} className="material-symbols-outlined article_left_download">arrow_upward</span>
                <div className="article_quantity">{"x "+quantiteArticleEnCours.quantie}</div>
                <span onClick={()=>{handleQuantiteArticleEnCours(-1)}} className="material-symbols-outlined article_left_upload">arrow_downward</span>
            </div>                        
        </div>
        )
     );
}

export default Article;