import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import model from "../models/models";

const Navbar = () => {
        
    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit,modeEnCours,authentificationEnCours} = paramGlobal;
    //const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};

    //const [typeCompte,setTypeCompte] = useState("visiteur");
    //const [modeConnexion,setModeConnexion] = useState("client");

/*     const utilisateur = {
        nomUtilisateur : '',
        prenomUtilisateur : '',
        telephoneUtilisateur : '',
        emailUtilisateur : '',
        addresseUtilisateur : '',
        statutUtilisateur : '',  
        typeCompteUtilisateur : 'visiteur'      
    } */
    
    //statutCommande : livree, nonlivree
    //action : addProduct, modifyProduct
    //typeCompteUtilisateur : visiteur,abonne, administrateur
    //modeEnCours : admin, client
    
    

    const handleModeConnexion = (modeEnCours ==="admin") ? "Désactiver le mode ADMIN":"Activer le mode ADMIN";
    const deconnexion = (utilisateurEnCours.typeCompteUtilisateur==="visiteur") ? "Se Connecter" : "Déconnexion";

    const changeModeEnCours = ()=>{
        const newModeEnCours = paramGlobal.modeEnCours === "admin" ? "client" : "admin";        
        setParamGlobal({...paramGlobal,modeEnCours:newModeEnCours})
    }

    const handleauthentificationEnCours = ()=>{        
        if(utilisateurEnCours.typeCompteUtilisateur==="visiteur")
        {
            setParamGlobal({...paramGlobal,authentificationEnCours:true,creationCompteEnCours:false});
        }else{
            
            const {bd_goodmeal,utilisateur,commande,emptyProduit,article} = model;
/*             const utilisateur = {        
                nomUtilisateur : '',
                prenomUtilisateur : '',
                telephoneUtilisateur : '',
                emailUtilisateur : '',
                addresseUtilisateur : '',
                statutUtilisateur : '',  
                typeCompteUtilisateur : 'visiteur'  ,
                login : '',
                pwd : '',
                _id : null   
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
            } */
            setParamGlobal({...paramGlobal,commandeEnCours:{...commande},modeEnCours:"client",utilisateurEnCours : {...utilisateur},authentificationEnCours:false })  
        }
    }


    useEffect(() => {
        
    }, []);

    return ( 
        <div className="navbar">
            <div className="navbar_logo">
                <div className="navbar_logo_titre">CRAZEE</div>
                <div><img className="navbar_logo_image" src="images/burger.jpg" alt="" /></div>
                <div className="navbar_logo_titre">BURGER</div>
            </div>
            
            <div className="navbar_login">
                {utilisateurEnCours.typeCompteUtilisateur === 'administrateur'  && <div className="navbar_login_btn_admin" onClick={changeModeEnCours}>
                    <div className="navbar_login_btn_admin_texte">{handleModeConnexion}</div>
                    <div className="navbar_login_btn_admin_image"></div>
                </div>}
                
                <div className="navbar_login_connexion">
                    <div className="navbar_login_connexion_identifiant">
                        {!(utilisateurEnCours.typeCompteUtilisateur==="visiteur") && <div className="navbar_login_connexion_identifiant_salutation">
                            <span className="navbar_login_connexion_identifiant_salutation_message">Hey, </span>
                            <span className="navbar_login_connexion_identifiant_salutation_prenom">{utilisateurEnCours.prenomUtilisateur}</span>
                        </div>}
                        <div className="navbar_login_connexion_identifiant_btn_SeConnecter" onClick={handleauthentificationEnCours}>{deconnexion}</div>
                    </div>
                    <div className="navbar_login_connexion_avatar">                        
                        <img src="images/logo_profil.png" alt="" onClick={()=>{
                                setParamGlobal({...paramGlobal,authentificationEnCours:true,creationCompteEnCours:true});
                            }} />
                    </div>
                </div>

            </div>

        </div>
     );
}
 
export default Navbar;