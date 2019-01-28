
const controller ={};


controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT furniture.id AS No,room.name as Rname, furniture.name as Fname,furnituretype.name as FTname, furniture.usable as usa,apartment.name as Apname FROM furniture JOIN room ON furniture.room_id = room.id JOIN furnituretype ON furniture.furnituretype_id = furnituretype.id JOIN apartment ON furniture.apartment_id = apartment.id',(err,furnitures) =>{
        if(err){
          res.json(err);
        }
      res.render('./admin/furnitures',{data:furnitures});
        });
    });
  }
};


controller.new = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = null;
      req.getConnection((err,conn) => {
        conn.query('SELECT * FROM  room',(err,room) => {
        conn.query('SELECT * FROM  furnituretype',(err,furnituretype) => {
          conn.query('SELECT * FROM  apartment',(err,apartment) => {
            res.render('./admin/furnitureForm',{
              data1:room,data2:furnituretype,data3:apartment,data4:data
                });
              });
            });
          });
      });
    }
};

controller.save = (req , res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = req.body;
      req.getConnection((err, conn) => {
        conn.query('INSERT INTO furniture set ?',[data],(err,furnitures) => {
          if(err){
            res.json(err);
          }
          console.log(furnitures);
        res.redirect('/admin/furniture');
        });
      });
    }
};


controller.delete = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM furniture WHERE id= ?',[id],(err,furnitures) => {
        if(err){
          res.json(err);
        }
        console.log(furnitures);
        res.redirect('/admin/furniture');
      });
    });
  }
};


controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM  room',(err,room) => {
      conn.query('SELECT * FROM  furnituretype',(err,furnituretype) => {
        conn.query('SELECT * FROM  apartment',(err,apartment) => {
          conn.query('SELECT * FROM furniture WHERE id = ?',[id],(err,furnitures) => {
            console.log(furnitures);
          res.render('./admin/furnitureForm',{
            data1:room,data2:furnituretype,data3:apartment,data4:furnitures
                });
              });
            });
          });
        });
    });
  }
};



controller.update = (req , res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      const data = req.body;
      req.getConnection((err, conn) => {
        conn.query('UPDATE furniture Set ? WHERE id = ? ',[data,id],(err,furnitures) => {
          if(err){
            res.json(err);
          }
          res.redirect('/admin/furniture');
        });
      });
    }
};


module.exports = controller;
