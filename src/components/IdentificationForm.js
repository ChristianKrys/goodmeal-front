import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import model from "../models/models";

const IdentificationForm = () => {

    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit,modeEnCours,authentificationEnCours,listeUtilisateur} = paramGlobal;
    //const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};

    const [login,setlogin] = useState("");
    const [pwd,setpwd] = useState("");
    

    const handleFermer = ()=>{setParamGlobal({...paramGlobal,authentificationEnCours:false})}
    const handleSubmit = (evt)=>{
        evt.preventDefault();
        
        const {bd_goodmeal,utilisateur,commande,emptyProduit,article} = model;

/*         const utilisateur = {        
            nomUtilisateur : '',
            prenomUtilisateur : '',
            telephoneUtilisateur : '',
            emailUtilisateur : '',
            addresseUtilisateur : '',
            statutUtilisateur : '',  
            typeCompteUtilisateur : 'visiteur'  ,
            login : '',
            pwd : ''    
        } */

        let indexTrouve = -1;

        listeUtilisateur.forEach((element,index) => {
            if(element.login===login && element.pwd===pwd){
/*                 utilisateur.nomUtilisateur = element.nomUtilisateur;
                utilisateur.prenomUtilisateur = element.prenomUtilisateur;
                utilisateur.telephoneUtilisateur = element.telephoneUtilisateur;
                utilisateur.emailUtilisateur = element.emailUtilisateur;
                utilisateur.addresseUtilisateur = element.addresseUtilisateur;
                utilisateur.statutUtilisateur = element.statutUtilisateur;
                utilisateur.typeCompteUtilisateur = element.typeCompteUtilisateur;
                utilisateur.login = element.login;
                utilisateur.pwd = element.pwd;  */
                indexTrouve = index;                               
            }
        });
        
        if(indexTrouve >= 0 ){
            const user = listeUtilisateur[indexTrouve];            
            setParamGlobal({...paramGlobal,utilisateurEnCours : {...user},authentificationEnCours:false });            
        }else{
            setParamGlobal({...paramGlobal,utilisateurEnCours : {...utilisateur},authentificationEnCours:false });
        }                
        
    }

    const handleChange = (e)=>{        
        const target = e.target;
        if(target.name==="login") setlogin(target.value);
        if(target.name==="pwd") setpwd(target.value);
    }

    useEffect(() => {
        
    }, [paramGlobal]);

    return ( 
        <div>
            <form action="" className="formId" onSubmit={(evt)=>{handleSubmit(evt)}}>
                <fieldset className="formId_fieldset">                    
                    <legend>IDENTIFICATION</legend>
                    <div className="formId_data">
                        <label htmlFor="login">Login</label>
                        <input onChange={(e)=>{handleChange(e)}} type="text" name="login" id="login" className="formId_login"/>
                        <label htmlFor="login">Mot de passe</label>
                        <input onChange={(e)=>{handleChange(e)}} type="password" name="pwd" id="pwd" className="formId_pwd"/>
                        <div className="formId_frame_Btn">
                            <input type="submit" value="Connecter" className="formId_Btn_Submit"/>
                            <button type="text" className="formId_Btn_Fermer" onClick={handleFermer}>Fermer</button>
                        </div>
                        <small className="formId_small">Mot de passe oublié</small>
                    </div>
                </fieldset>
            </form>
        </div>
     );
}


 
export default IdentificationForm;