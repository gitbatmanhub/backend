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


};


module.exports= controller;