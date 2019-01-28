const controller = {};

controller.list = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      req.getConnection((err,conn) => {
        conn.query('SELECT roomtype.id as No, roomtype.name as Name,roomtype.detail as detail,apartment.name as Apname FROM roomtype JOIN apartment on roomtype.apartment_id = apartment.id WHERE roomtype.apartment_id = ?',[req.session.apmid], (err,roomtype) => {
          if(err){
            res.json(roomtype);
          }
          res.render('roomtypes', {
            data:roomtype
          });
        });
      });
    }
};

controller.new = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const data = null;
      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM roomtype WHERE apartment_id = ?',[req.session.apmid],(err, roomtype)=>{
          conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err, apartment)=>{
          res.render('roomtypeForm',{
            data1:apartment,data2:data
          });
         });
        });
      });
    }
};

controller.save = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('Name', 'ประเภทห้องไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/roomtype/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO roomtype set ?',[data],(err,roomtype) => {
        if(err){
          res.json(err);
        }
        res.redirect('/roomtype');
      });
    });
  }
 }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM roomtype WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,roomtype) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/roomtype');
        }
      });
    });
  }
};

controller.edit = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment WHERE id =?',[req.session.apmid],(err, apartment)=>{
        conn.query('SELECT * FROM roomtype WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, roomtype) => {
          res.render('roomtypeForm',{
          data1:apartment,data2:roomtype
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
    req.check('Name', 'ประเภทห้องไม่ถูกต้อง !').notEmpty();
    var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/roomtype/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE roomtype SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,roomtype) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลห้องพักสำเร็จ";
        res.redirect('/roomtype');
      }
    });
   });
  }
 }
};

module.exports = controller;
