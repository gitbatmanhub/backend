'use strict'
var Project = require('../models/project');
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
  getProjects: function (req, res){
    Project.find({}).sort('-year').exec((err, projects) =>{

      if(err) return res.status(500).send({message: 'Error al devolver los datos'});

      if(!projects) return res.status(404).send({message:'No hay projectos para mostrar'});

      return res.status(200).send({projects});


    });
  }

};


module.exports= controller;