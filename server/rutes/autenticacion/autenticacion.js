const express = require('express');
const rute = express();
const Usuarios = require('../../models/usuarios');

//const bcrypt = require('bcrypt');
//var jwt = require('jsonwebtoken');

rute.post('/', (req, res) => {
    Usuarios.find({usuario: req.body.usuario})
        .then(datos => {        
            if(datos){ 
                let resultLogIn = false;               
                for(var i=0; i<datos.length; i++){
                    //const passwordValida = bcrypt.compareSync(req.body.password, datos[i].password);
                    if(datos[i].contrasenia === req.body.contrasenia){                       
                        //var token = jwt.sign({ user: datos.user, type_user: datos.type_user }, 'password', { expiresIn: "12h" });
                        res.json({
                            //token: token,
                            usuario: datos[i].usuario})
                        resultLogIn = true;
                        break;
                    }
                }    
            if(resultLogIn === false){
                res.status(400).json({
                    error: 'No se pudo realizar el ingreso',
                    msj: 'usuario y/o contraseña incorrectos.'
                })  
            }    

            }else{
                res.status(400).json({
                    error: 'No se pudo realizar el ingreso',
                    msj: 'usuario y/o contraseña incorrectos.'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error: 'Ok',
                msj: 'Error en el servicio' + err
            })
        })
})

module.exports = rute;