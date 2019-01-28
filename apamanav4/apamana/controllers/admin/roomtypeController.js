const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT roomtype.id as No, roomtype.name as Name,roomtype.detail as detail,apartment.name as Apname FROM roomtype JOIN apartment on roomtype.apartment_id = apartment.id', (err,roomtype) => {
        if(err){
          res.json(roomtype);
        }
        //console.log(customers);
        res.render('./admin/roomtypes', {
          data:roomtype

        });
      });
    });
  }
};

controller.new = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = null;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM roomtype',(err, roomtype)=>{
        conn.query('SELECT * FROM apartment',(err, apartment)=>{
        res.render('./admin/roomtypeForm',{
          data1:apartment,data2:data
        });
       });
      });
    });
  }
};

controller.save = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = req.body;
      req.getConnection((err, conn) => {
        conn.query('INSERT INTO roomtype set ?',[data],(err,roomtype) => {
          if(err){
            res.json(err);
          }
          console.log(roomtype);
          res.redirect('/admin/roomtype');
        });
      });
    }
};

controller.delete = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      req.getConnection((err, conn) => {
        conn.query('DELETE FROM roomtype WHERE id = ?',[id],(err,roomtype) => {
          if(err){
            res.json(err);
          }
          console.log(roomtype);
          res.redirect('/admin/roomtype');
        });
      });
    }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err, apartment)=>{
        conn.query('SELECT * FROM roomtype WHERE id = ?',[id],(err, roomtype) => {
          res.render('./admin/facilityForm',{
          data1:apartment,data2:roomtype
          });
        });
      });
    });
  }
};

controller.update = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      const data = req.body;
      req.getConnection((err, conn) => {
        conn.query('UPDATE roomtype SET ? WHERE id = ?',[data,id],(err,roomtype) => {
          if(err){
            res.json(err);
          }
          console.log(roomtype);
          res.redirect('/admin/roomtype');
        });
      });
    }
};

module.exports = controller;
