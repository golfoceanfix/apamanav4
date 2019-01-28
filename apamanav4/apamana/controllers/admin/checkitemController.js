
const controller ={};


controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT checkitem.id as No,apartment.name as Apname,room.name as Rname,furniture.name as Fname,checkitem.detail as Detail,checkitem.status as Status FROM checkitem JOIN apartment ON checkitem.apartment_id = apartment.id JOIN furniture ON checkitem.furniture_id = furniture.id JOIN movein ON checkitem.movein_id = movein.id JOIN room ON movein.room_id = room.id',(err,checkitem) =>{
        if(err){
          res.json(err);
        }
      res.render('./admin/checkitems',{data:checkitem});
        });
    });
  }
};


controller.new = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = null;
      req.getConnection((err,conn) => {
        conn.query('SELECT * FROM  apartment',(err,apartment) => {
        conn.query('SELECT room.name,movein.id FROM  movein JOIN room ON movein.room_id = room.id',(err,room) => {
          conn.query('SELECT * FROM  furniture',(err,furniture) => {
            res.render('./admin/checkitemForm',{
              data1:apartment,data2:room,data3:furniture,data4:data
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
      conn.query('INSERT INTO checkitem set ?',[data],(err,checkitem) => {
        if(err){
          res.json(err);
        }
        console.log(checkitem);
      res.redirect('/admin/checkitem');
      });
    });
  }
};


controller.delete = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM checkitem WHERE id= ?',[id],(err,checkitem) => {
        if(err){
          res.json(err);
        }
        console.log(checkitem);
        res.redirect('/admin/checkitem');
      });
    });
  }
};


controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM  apartment',(err,apartment) => {
      conn.query('SELECT room.name,movein.id FROM  movein JOIN room ON movein.room_id = room.id',(err,movein) => {
        conn.query('SELECT * FROM  furniture',(err,furniture) => {
          conn.query('SELECT * FROM checkitem WHERE id = ?',[id],(err,checkitem) => {
            console.log(checkitem);
          res.render('./admin/checkitemForm',{
          data1:apartment,data2:movein,data3:furniture,data4:checkitem
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
        conn.query('UPDATE checkitem Set ? WHERE id = ? ',[data,id],(err,checkitem) => {
          if(err){
            res.json(err);
          }
          res.redirect('/admin/checkitem');
        });
      });
    }
};


module.exports = controller;
