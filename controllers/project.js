'use strict'
var Project = require('../models/project');
var fs = require('fs');
var path = require ('path');



var controller = {
  home: function (req, res){
  return res.status(200).send({
    message:'Soy la home'
});
  },

  test: function (req, res){
    return res.status(200).send({
      message:'Soy el metodo o acción test del controlador de project'
    });
  },


  //Método para guardar proyectos
  saveProject: function (req, res){
    var project = new Project();

    var params= req.body;
    project.name= params.name;
    project.description= params.description;
    project.category= params.category;
    project.year= params.year;
    project.langs= params.langs;
    project.image= null;


    project.save((err, projectStored)=>{
      if(err) return res.status(500).send({message:'Error al guardar documento'});

      if(!projectStored) return res.status(404).send({message:'No se ha podido guardar el projecto'});

    })


    return res.status(200).send({
      project: project,
      message: 'Método saveProject'
    })


  },


  //Método para devolver proyectos
  getProject: function (req, res){
      var projectId=req.params.id;
      if(projectId==null) return res.status(404).send({message:'El proyecto no existe'});



      Project.findById(projectId, (err, project)=>{


        if(err) return res.status(500).send({message: 'Error al devolver los datos'});

        if(!project) return res.status(404).send({message:'El proyecto no existe'});

        return res.status(200).send({
          project
        });
      });
  },


  //Método para listar proyectos
  getProjects: function (req, res){
    Project.find({}).sort('-year').exec((err, projects) =>{

      if(err) return res.status(500).send({message: 'Error al devolver los datos'});

      if(!projects) return res.status(404).send({message:'No hay projectos para mostrar'});

      return res.status(200).send({projects});


    });
  },


  //Método para actualizar proyectos

  updateProject: function (req, res){
    var projectId= req.params.id;
    var update = req.body;
    Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdate)=>{
      if(err) return res.status(500).send({message: 'Error al actualizar los datos'});

      if(!projectUpdate) return res.status(404).send({message:'No hay projectos para actualizar'});

      return res.status(200).send({project:projectUpdate});

    });

  },

  //Método para eliminar proyectos

  deleteProject: function (req, res){
    var projectId = req.params.id;

    Project.findByIdAndDelete(projectId, (err, projectRemove) =>{
      if(err) return res.status(500).send({message:'No se ha podido borrar el documento'})

      if(!projectRemove) return res.status(404).send({message:'No hay projectos para borrar'});

      return res.status(200).send({project:projectRemove});



    });

  },

  //Método para subir imágenes con extensiones especificas

  uploadImage: function (req, res){
    var projectId =req.params.id;
    var fileName = 'Imagen no subida'

    if(req.files){
      var filePath = req.files.image.path;
      var fileSplit = filePath.split('/');
      var fileName = fileSplit[1];
      var extSplit= fileName.split('\.');
      var fileExt = extSplit[1];

      if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

        Project.findByIdAndUpdate(projectId, {image:fileName}, {new:true}, (err, projectUpdate)=>{
          if(err) return res.status(200).send({message: 'La imágen no se ha subido'});


          if(!projectUpdate) return res.status(404).send({message: 'El proyecto no existe'});


          return res.status(200).send({
            project: projectUpdate
          });
        });


      }else{
        fs.unlink(filePath, (err)=>{

                return res.status(200).send({message: 'la extensión no es valida'});

            });

      }

    }else{
      return res.status(200).send({
        message: fileName
      });
    }
  },

  //Método que me devuelve las imágenes

  getImageFile: function (req, res){
    var file = req.params.image;
    var pathFile = './uploads/'+file;
    fs.exists(pathFile, (exists)=>{
      if (exists){
        return res.sendFile(path.resolve(pathFile));
      }else{
        return res.status(200).send({
          message: 'No existe la imágen'
            })

      }
    });
  }



};


module.exports= controller;