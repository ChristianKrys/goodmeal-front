    //--Table : Produit, Client, Employer, Commande
    const bd_goodmeal = {
        Coll_Produit : "produits",
        Coll_Utilisateur : "utilisateurs",
        Coll_Commande : "commandes"
    }    

    const emptyProduit = {
        urlPhoto : '',
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
        _id:null 
    }
    
    const utilisateur = {        
        nomUtilisateur : '',
        prenomUtilisateur : '',
        telephoneUtilisateur : '',
        emailUtilisateur : '',
        addresseUtilisateur : '',
        statutUtilisateur : '',  
        typeCompteUtilisateur : 'visiteur' ,
        login : '',
        pwd : '',
        _id:null      
    }

    //statutCommande : livree, nonlivree
    //action : addProduct, modifyProduct, listerCommande
    //typeCompteUtilisateur : visiteur,abonne, administrateur
    //modeEnCours : admin, client

    const model = {bd_goodmeal,utilisateur,commande,emptyProduit,article};

    export default model;


