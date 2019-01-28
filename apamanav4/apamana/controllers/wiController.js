const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT monthlyelectric.id AS No,apartment.name AS Apname,room.name AS Rname,monthlyelectric.unit AS Unit,monthlyelectric.month AS month,monthlyelectric.year AS year,monthlyelectric.date FROM monthlyelectric JOIN apartment ON monthlyelectric.apartment_id = apartment.id JOIN room ON monthlyelectric.room_id = room.id WHERE monthlyelectric.apartment_id = ?',[req.session.apmid] ,(err,monthlyelectric) => {
        if(err){
          res.json(monthlyelectric);
        }
        res.render('wis', {
          data:monthlyelectric

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
            conn.query('SELECT customer.id,customer.name AS name FROM contract JOIN customer ON contract.customer_id = customer.id WHERE contract.apartment_id = ?',[req.session.apmid],(err,customer) => {
            res.render('wiForm',{
              data1:apartment,data2:room,data3:customer,data4:data
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
    req.check('unit', 'หน่วยไม่ถูกต้อง !').isNumeric();
    req.check('month', 'เดือนไม่ถูกต้อง !').notEmpty();
    req.check('year', 'ปีไม่ถูกต้อง !').notEmpty();
    req.check('date', 'วันที่บันทึกไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/monthlyelectric/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data=req.body
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO monthlyelectric set ?',[data],(err,contract) =>{
        if(err){
          res.json(err);
        }
        res.redirect('/wi');
      });
    });
  }
 }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM monthlyelectric WHERE id = ? AND apartment_id = ?',[id ,req.session.apmid],(err,monthlyelectric) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/wi');
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
            conn.query('SELECT customer.id,customer.name AS name FROM contract JOIN customer ON contract.customer_id = customer.id WHERE contract.apartment_id = ?',[req.session.apmid],(err,customer) => {
              conn.query('SELECT * FROM monthlyelectric WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,monthlyelectric) =>{
            res.render('wiForm',{
                  data1:apartment,data2:room,data3:customer,data4:monthlyelectric
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
    req.check('unit', 'หน่วยไม่ถูกต้อง !').isNumeric();
    req.check('month', 'เดือนไม่ถูกต้อง !').notEmpty();
    req.check('year', 'ปีไม่ถูกต้อง !').notEmpty();
    req.check('date', 'วันที่บันทึกไม่ถูกต้อง !').notEmpty();
    var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/monthlyelectric/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE monthlyelectric SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,monthlyelectric) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลสำเร็จ";
        res.redirect('/wi');
      }
    });
   });
  }
 }
};

module.exports = controller;
