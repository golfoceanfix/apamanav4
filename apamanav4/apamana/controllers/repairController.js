const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT repair.id as No,apartment.name as Apname,room.name as Rname,repairtype.name as Rpname,repair.date_notify as DateN,repair.date_repair as DateR,repair.status AS Status FROM repair JOIN apartment ON repair.apartment_id = apartment.id JOIN room ON repair.room_id = room.id JOIN repairtype ON repair.repairtype_id = repairtype.id WHERE repair.apartment_id = ?',[req.session.apmid], (err,repair) => {
        if(err){
          res.json(repair);
        }
        res.render('repairs', {
          data:repair

        });
      });
    });
  }
};

controller.new = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const data = null;
    req.getConnection((err,conn) => {
      conn.query('SELECT * from apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
        conn.query('SELECT * FROM room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
          conn.query('SELECT * FROM repairtype WHERE apartment_id = ?',[req.session.apmid],(err,repairtype) => {
          res.render('repairForm',{
            data1:apartment,data2:room,data3:repairtype,data4:data
           });
          });
        });
      });
    });
  }
};

controller.save = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('room_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('repairtype_id', 'ประเภทอุปกรณ์ไม่ถูกต้อง !').notEmpty();
    req.check('date_notify', 'วันที่แจ้งไม่ถูกต้อง !').notEmpty();
    req.check('status', 'ชั้นไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/repair/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
      const data=req.body
      req.getConnection((err,conn) =>{
        conn.query('INSERT INTO repair set ?',[data],(err,repair) =>{
          if(err){
            res.json(err);
          }
          res.redirect('/repair');
        });
      });
    }
  }
};

controller.delete = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const {id} = req.params;
      req.getConnection((err, conn) => {
        conn.query('DELETE FROM repair WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,repair) => {
          if(err){
            res.json(err);
          }else {
            req.session.success=true;
            req.session.topic="ลบข้อมูลสำเร็จ";
          res.redirect('/repair');
          }
        });
      });
    }
};

controller.edit = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * from apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
        conn.query('SELECT * FROM room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
          conn.query('SELECT * FROM repairtype WHERE apartment_id = ?',[req.session.apmid],(err,repairtype) => {
          conn.query('SELECT * FROM repair WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, repair) => {
            res.render('repairForm',{
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
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    const data = req.body;
    req.check('room_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('repairtype_id', 'ประเภทอุปกรณ์ไม่ถูกต้อง !').notEmpty();
    req.check('date_notify', 'วันที่แจ้งไม่ถูกต้อง !').notEmpty();
    req.check('status', 'ชั้นไม่ถูกต้อง !').notEmpty();
    var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/repair/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE repair SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,repair) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลสำเร็จ";
        res.redirect('/repair');
      }
    });
   });
  }
 }
};


controller.repair = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
      conn.query('UPDATE repair SET status = 1,date_repair = now() WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,repair) => {
        if(err){
          res.json(err);
        }
        res.redirect('/repair');
      });
    });
  }
};

module.exports = controller;
