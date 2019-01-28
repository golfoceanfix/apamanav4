const controller = {};

controller.list = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      req.getConnection((err,conn) => {
        conn.query('SELECT apartment.name as apartmentname, facility.id,facility.name, facility.detail FROM facility JOIN apartment ON facility.apartment_id = apartment.id WHERE facility.apartment_id = ?',[req.session.apmid], (err,facility) => {
          if(err){
            res.json(facility);
          }
          res.render('facilitys', {
            data:facility
          });
        });
      });
    }
};

controller.new = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const data = null;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err, apartment)=>{
        res.render('facilityForm',{
          data1:apartment,data2:data
        });
      });
    });
  }
};

controller.save = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('name', 'ชื่อสิ่งอำนวยความสะดวกไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/facility/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO facility set ?',[data],(err,facility) => {
        if(err){
          res.json(err);
        }
        res.redirect('/facility');
      });
    });
  }
 }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM facility WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,facility) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/facility');
        }
      });
    });
  }
};

controller.edit = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err, apartment)=>{
        conn.query('SELECT * FROM facility WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, facility) => {
          res.render('facilityForm',{
          data1:apartment,data2:facility
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
    req.check('name', 'ชื่อสิ่งอำนวยความสะดวกไม่ถูกต้อง !').notEmpty();
    var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/room/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE facility SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,facility) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลสำเร็จ";
        res.redirect('/facility');
      }
    });
   });
  }
 }
};

module.exports = controller;
