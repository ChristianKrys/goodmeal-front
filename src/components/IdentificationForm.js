import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import model from "../models/models";

const IdentificationForm = () => {

    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {creationCompteEnCours,baseDeDonnee,urlServer,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit,modeEnCours,authentificationEnCours,listeUtilisateur} = paramGlobal;
    const {Coll_Produit,Coll_Utilisateur,Coll_Commande} = baseDeDonnee;

    const [login,setlogin] = useState("");
    const [pwd,setpwd] = useState("");

    const [utilisateur, setutilisateur] = useState({
        nomUtilisateur : "",
        prenomUtilisateur : "",
        telephoneUtilisateur : "",
        emailUtilisateur : "",
        addresseUtilisateur : "",
        loginCompte : "",
        pwdCompte : "",
        pwdConfirmer : ""
    });   
    const [pwdConfirmer, setpwdConfirmer] = useState("");
    

    const handleFermer = ()=>{setParamGlobal({...paramGlobal,authentificationEnCours:false})}

    const handleSubmitCompte = (evt)=>{
        evt.preventDefault();

        let indexTrouvelogin = -1;
        let indexTrouvepwd = -1;
        let idExiste = null;

        listeUtilisateur.forEach((element,index) => {
            if(element.login===utilisateur.loginCompte){
                indexTrouvelogin = index;                               
            }
            if(element.pwd===utilisateur.pwdCompte){
                indexTrouvepwd = index;                               
            }

            if(element.login===utilisateur.loginCompte && element.pwd===utilisateur.pwdCompte){
                indexTrouvelogin = index;  
                idExiste = element._id;                            
            }
        });
        

        let newUtilisateur = {        
            nomUtilisateur : utilisateur.nomUtilisateur,
            prenomUtilisateur : utilisateur.prenomUtilisateur,
            telephoneUtilisateur : utilisateur.telephoneUtilisateur,
            emailUtilisateur : utilisateur.emailUtilisateur,
            addresseUtilisateur : utilisateur.addresseUtilisateur,
            statutUtilisateur : '',  
            typeCompteUtilisateur : 'abonne',
            login : utilisateur.loginCompte,
            pwd : utilisateur.pwdCompte    
        }

        if(utilisateur.pwdCompte === "" || utilisateur.pwdCompte !== utilisateur.pwdConfirmer ){
            alert('Confirmation de mot de passe incorrecte !!');
            return
        }

        if(utilisateurEnCours._id === "" || utilisateurEnCours._id === null){

            if(indexTrouvelogin >= 0 ){
                alert('Login non disponible !!');
                return
            }
            if(indexTrouvepwd >= 0 ){
                alert('Mot de passe non disponible !!');
                return
            }
            addUtilisateur(newUtilisateur);
        }else{            

            newUtilisateur = {...newUtilisateur, _id : utilisateurEnCours._id};
            if(idExiste === null){
                modifyUtilisateur(newUtilisateur);
            }else{
                if(idExiste === utilisateurEnCours._id){
                    modifyUtilisateur(newUtilisateur);
                }else{
                    alert("login et mot de passe non disponible !!");
                }
            }

        }


    //statutCommande : livree, nonlivree
    //action : addProduct, modifyProduct, listerCommande
    //typeCompteUtilisateur : visiteur,abonne, administrateur
    //modeEnCours : admin, client
        
    }


    function addUtilisateur(utilisateur){ 
        const url = urlServer+Coll_Utilisateur;          
        fetch(url,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(utilisateur)                    
        })
        .then(response =>{
            //------ Quand la requete est executée ------
            if(!response.ok){
                throw Error('Echec d\'enregistrement de produit !')
            }else{
                setParamGlobal({...paramGlobal,creationCompteEnCours:false});
                console.log('Enregistré avec succès !');
                alert('Enregistré avec succès !');
            }
        })
        .catch((err)=>{
            //------- Recuperation de message d'erreur -------
            console.log(err.message);                        
        })
    }

    function modifyUtilisateur(utilisateur){ 
        const id = utilisateur._id;
        const url = urlServer+Coll_Utilisateur+"/"+id;          
        fetch(url,{
            //method: 'PATCH',
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(utilisateur)                    
        })
        .then(response =>{
            //------ Quand la requete est executée ------
            if(!response.ok){
                throw Error('Echec d\'enregistrement !')
            }else{
                setParamGlobal({...paramGlobal,creationCompteEnCours:false});
                console.log('Modifié avec succès !');
                alert('Modifié avec succès !');
            }
        })
        .catch((err)=>{
            //------- Recuperation de message d'erreur -------
            console.log(err.message);                        
        })
    }

    function supprimeUtilisateur(utilisateur){ 
        const id = utilisateur._id;
        const url = urlServer+Coll_Utilisateur+"/"+id;         
        fetch(url,{
            method: 'DELETE',                  
        })
        .then(response =>{
            //------ Quand la requete est executée ------
            if(!response.ok){
                throw Error('Echec de suppression !')
            }else{
                setParamGlobal({...paramGlobal,creationCompteEnCours:false});
                console.log('Supprimé avec succès !'); 
                alert('Compte Supprimé avec succès !');                
            }
        })
        .catch((err)=>{
            //------- Recuperation de message d'erreur -------
            console.log(err.message);                        
        })
    }


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
        if(target.name==="pwdConfirmer") {
            setpwdConfirmer(target.value);
            setutilisateur({...utilisateur,[target.name]:target.value});
        }               

        //---- Creation de compte -----
        if(target.name!=="login" && target.name!=="pwd" && target.name!=="pwdConfirmer") setutilisateur({...utilisateur,[target.name]:target.value});
        
        
/*      nomUtilisateur
        prenomUtilisateur
        telephoneUtilisateur
        emailUtilisateur
        loginCompte
        pwdCompte
        pwdConfirmer 
*/
    }

    useEffect(() => {
        setutilisateur({...utilisateurEnCours,loginCompte : utilisateurEnCours.login, pwdCompte : utilisateurEnCours.pwd});
    }, [paramGlobal]);

    return ( 
        <div>
            {!creationCompteEnCours && <form action="" className="formId" onSubmit={(evt)=>{handleSubmit(evt)}}>
                <fieldset className="formId_fieldset">                    
                    <legend>IDENTIFICATION</legend>
                    <div className="formId_data">
                        <label htmlFor="login">Login</label>
                        <input onChange={(e)=>{handleChange(e)}} type="text" name="login" id="login" className="formId_login"/>
                        <label htmlFor="pwd">Mot de passe</label>
                        <input onChange={(e)=>{handleChange(e)}} type="password" name="pwd" id="pwd" className="formId_pwd"/>
                        <div className="formId_frame_Btn">
                            <input type="submit" value="Connecter" className="formId_Btn_Submit"/>
                            <button type="text" className="formId_Btn_Fermer" onClick={handleFermer}>Fermer</button>
                        </div>
                        <small className="formId_small">Mot de passe oublié</small><br/>
                        <small type="text" className="formId_small" onClick={()=>{
                                setParamGlobal({...paramGlobal,creationCompteEnCours:true});
                                setutilisateur(utilisateurEnCours);
                            }}>Créer un compte</small>
                    </div>
                </fieldset>
            </form>}
            {creationCompteEnCours && <form action="" name="form2" className="formId" onSubmit={(evt)=>{handleSubmitCompte(evt)}}>
                <fieldset className="formId_fieldset">                    
                    <legend>COMPTE</legend>
                    <div className="formId_data">
                        <label htmlFor="nomUtilisateur">Nom</label>
                        <input onChange={(e)=>{handleChange(e)}} type="text" name="nomUtilisateur" id="nomUtilisateur" value={utilisateur.nomUtilisateur} className="formId_login"/>
                        <label htmlFor="prenomUtilisateur">Prénom</label>
                        <input onChange={(e)=>{handleChange(e)}} type="text" name="prenomUtilisateur" id="prenomUtilisateur" value={utilisateur.prenomUtilisateur} className="formId_login"/>
                        <label htmlFor="telephoneUtilisateur">Téléphone</label>
                        <input onChange={(e)=>{handleChange(e)}} type="text" name="telephoneUtilisateur" id="telephoneUtilisateur" value={utilisateur.telephoneUtilisateur} className="formId_login"/>
                        <label htmlFor="emailUtilisateur">Email</label>
                        <input onChange={(e)=>{handleChange(e)}} type="email" name="emailUtilisateur" id="emailUtilisateur" value={utilisateur.emailUtilisateur} className="formId_login"/>
                        <label htmlFor="addresseUtilisateur">Adresse</label>
                        <input onChange={(e)=>{handleChange(e)}} type="text" name="addresseUtilisateur" id="addresseUtilisateur" value={utilisateur.addresseUtilisateur} className="formId_login"/>
                        
                        <label htmlFor="loginCompte">Login</label>
                        <input onChange={(e)=>{handleChange(e)}} type="text" name="loginCompte" id="loginCompte" value={utilisateur.loginCompte} className="formId_login"/>
                        <label htmlFor="pwdCompte">Mot de passe</label>
                        <input onChange={(e)=>{handleChange(e)}} type="password" name="pwdCompte" id="pwdCompte" value={utilisateur.pwdCompte} className="formId_pwd"/>                      

                        <label htmlFor="pwdConfirmer">Confirmer le Mot de passe</label>
                        <input onChange={(e)=>{handleChange(e)}} type="password" name="pwdConfirmer" id="pwdConfirmer" value={pwdConfirmer} className="formId_pwd"/>

                        <div className="formId_frame_Btn">
                            <input type="submit" value="Enregistrer" className="formId_Btn_Submit"/>
                            <button type="text" className="formId_Btn_Fermer" onClick={()=>{setParamGlobal({...paramGlobal,creationCompteEnCours:false});}}>Fermer</button>
                            <button type="text" className="formId_Btn_Fermer" onClick={()=>{supprimeUtilisateur(utilisateurEnCours)}}>Supprimer</button>
                        </div>
                    </div>
                </fieldset>
            </form>}

        </div>
     );
}


 
export default IdentificationForm;