const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT repair.id as No,apartment.name as Apname,room.name as Rname,repairtype.name as Rpname,repair.date_notify as DateN,repair.date_repair as DateR,repair.status AS Status FROM repair JOIN apartment ON repair.apartment_id = apartment.id JOIN room ON repair.room_id = room.id JOIN repairtype ON repair.repairtype_id = repairtype.id', (err,repair) => {
        if(err){
          res.json(repair);
        }
        //console.log(customers);
        res.render('./admin/repairs', {
          data:repair

        });

      });
    });
  }
};

controller.new = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = null;
    req.getConnection((err,conn) => {
      conn.query('SELECT * from apartment',(err,apartment)=>{
        conn.query('SELECT * FROM room',(err,room) => {
          conn.query('SELECT * FROM repairtype',(err,repairtype) => {
          res.render('./admin/repairForm',{
            data1:apartment,data2:room,data3:repairtype,data4:data
           });
          });
        });
      });
    });
  }
};

controller.save = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data=req.body
    req.getConnection((err,conn) =>{
      console.log(data);
      conn.query('INSERT INTO repair set ?',[data],(err,repair) =>{
        if(err){
          res.json(err);
        }
        console.log(repair);
        res.redirect('/admin/repair');
      });
    });
  }
};

controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM repair WHERE id = ?',[id],(err,repair) => {
        if(err){
          res.json(err);
        }
        console.log(repair);
        res.redirect('/admin/repair');
      });
    });
  }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err,apartment)=>{
        conn.query('SELECT * FROM room',(err,room) => {
          conn.query('SELECT * FROM repairtype',(err,repairtype) => {
          conn.query('SELECT * FROM repair WHERE id = ?',[id],(err, repair) => {
            res.render('./admin/repairForm',{
              data1:apartment,data2:room,data3:repairtype,data4:repair
             });
            });
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
      console.log(data);
      req.getConnection((err, conn) => {
        conn.query('UPDATE repair SET ? WHERE id = ?',[data,id],(err,repair) => {
          if(err){
            res.json(err);
          }
          console.log(repair);
          res.redirect('/admin/repair');
        });
      });
    }
};

controller.repair = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
      conn.query('UPDATE repair SET status = 1 WHERE id = ?',[data.status,id],(err,repair) => {
        if(err){
          res.json(err);
        }
        console.log(data);
        res.redirect('/admin/repair');
      });
    });
  }
};

module.exports = controller;
