const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT monthlywater.id AS No,apartment.name AS Apname,room.name AS Rname,monthlywater.unit AS Unit,monthlywater.month AS month,monthlywater.year AS year,monthlywater.date FROM monthlywater JOIN apartment ON monthlywater.apartment_id = apartment.id JOIN room ON monthlywater.room_id = room.id WHERE monthlywater.apartment_id = ?',[req.session.apmid] ,(err,monthlywater) => {
        if(err){
          res.json(monthlywater);
        }
        res.render('was', {
          data:monthlywater

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
            res.render('waForm',{
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
      res.redirect('/monthlywater/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data=req.body
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO monthlywater set ?',[data],(err,contract) =>{
        if(err){
          res.json(err);
        }
        res.redirect('/wa');
      });
    });
  }
 }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM monthlywater WHERE id = ? AND apartment_id = ?',[id ,req.session.apmid],(err,monthlywater) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/wa');
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
              conn.query('SELECT * FROM monthlywater WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,monthlywater) =>{
            res.render('waForm',{
                  data1:apartment,data2:room,data3:customer,data4:monthlywater
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
res.redirect('/monthlywater/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE monthlywater SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,monthlywater) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลสำเร็จ";
        res.redirect('/wa');
      }
    });
   });
  }
 }
};
module.exports = controller;
