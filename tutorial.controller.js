const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req,res) => {
  if(!req.body.TaskTitle){
      res.status(400).send({
          message:"Content can not be empty!"
      });
      return;
  }
const tutorial = {
    Tasktitel: req.body.TaskTitle,
    TaskDate: req.body.TaskDate,
    TaskTimeStart: req.body.TaskTimeStart,
    TaskTimeEnd: req.body.TaskTimeEnd,
    TaskDescription: req.body.TaskDescription,
    TaskReady: req.body.TaskReady ? req.body.TaskReady: false
};
Tutorial.create(tutorial)
.then(data =>{
    res.send(data);
})
.catch(err=>{
    res.status(500).send({
        message:err.message||"some error while creating tutorial"
    });
});
};
exports.findAll = (req,res) => {
   const title = req.query.title;
   var condition = title ? {title:{[Op.like]: `%${title}%`}}: null;
    Tutorial.findAll({where: condition})
    .then(data => {
        res.send(data);
    })
.catch(err =>{
    res.status(500).send({
        message: err.message || "Some err while  retriving tutorial"
    });
});
};
exports.findOne = (req,res) => {
    const id = req.params.id;
     Tutorial.findByPk(id)
     .then(data => {
         res.send(data);
     })
 .catch(err =>{
     res.status(500).send({
         message: err.message || "Some err with id= " + id
     });
  });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body,{where: {id : id }})
        .then(num => {
            if(num == 1){
                res.send({message: "update"});
            }else{
                res.send({message: "can not update"});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error"
            });
        });
};
/*
exports.update = (req,res) => {
    const id = req.params.id;
    Tutorial.update(req.boby,{where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({ message:"Tutorial was update successfully."});
            }else{
                res.send({message: "Can not update Tutorial."});
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error updating Tutorial"
            });
        });
};*/
exports.delete = (req,res) => {
        const id = req.params.id;
         Tutorial.destroy({where: {id:id}})
         .then(num => {
             if(num ==1){
                 res.send({ message:"Tutorial was delete successfully."});
             }else{
                 res.send({message: "Can not delete Tutorial."});
         }
         
     })
     .catch(err =>{
         res.status(500).send({
             message: "Could not delete Tutorial "
         });
        
    });
};
exports.deleteAll =(req,res) =>{
    Tutorial.destroy({where:{}, truncate:false})
    .then(num => {
            res.send({message:"Tutorial was delete successfully."});
    })
    .catch(err =>{
        res.status(500).send({
            message:"Could not delete Tutorial"
        });
    });
};

exports.findAllPublished = (req,res) => {
        const id = req.params.id;
         Tutorial.findAll({where: {published:true}})
         .then(data => {
                 res.send(data);
         
         })
     
     .catch(err =>{
         res.status(500).send({
             message: "Could not delete Tutorial "
         });
        
    });

};
