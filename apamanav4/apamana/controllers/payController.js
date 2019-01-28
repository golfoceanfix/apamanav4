const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT pay.id AS No,room.name AS Rname,apartment.name AS Apname,pay.amount AS Amount,pay.date AS Date,pay.status AS Status,pay.fine AS Fine,pay.appointment AS Appointment FROM pay JOIN bill ON pay.bill_id = bill.id JOIN room ON bill.room_id = room.id JOIN apartment ON pay.apartment_id = apartment.id WHERE pay.apartment_id = ?',[req.session.apmid], (err,pay) => {
        if(err){
          res.json(pay);
        }
        res.render('pays', {
          data:pay

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
        conn.query('SELECT bill.id AS bid,room.name AS Rname FROM bill JOIN room ON bill.room_id = room.id WHERE bill.apartment_id = ?',[req.session.apmid],(err, room)=>{
        res.render('payForm',{
          data1:apartment,data2:room,data3:data
        });
       });
      });
    });
  }
};

controller.save = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('bill_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('date', 'วันที่ชำระไม่ถูกต้อง !').notEmpty();
    req.check('fine', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('appointment', 'วันกำหนดชำระไม่ถูกต้อง !').notEmpty();
    req.check('amount', 'ราคารวมไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').isNumeric();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/pay/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO pay set ?',[data],(err,pay) => {
        if(err){
          res.json(err);
        }
        res.redirect('/pay');
      });
    });
  }
 }
};





controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM pay WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,pay) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/pay');
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
          conn.query('SELECT bill.id AS bid,room.name AS Rname FROM bill JOIN room ON bill.room_id = room.id WHERE bill.apartment_id = ?',[req.session.apmid],(err, room)=>{
          conn.query('SELECT * FROM pay WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, pay) => {
            console.log(pay);
            res.render('payForm',{
                  data1:apartment,data2:room,data3:pay
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
    req.check('bill_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('date', 'วันที่ชำระไม่ถูกต้อง !').notEmpty();
    req.check('fine', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('appointment', 'วันกำหนดชำระไม่ถูกต้อง !').notEmpty();
    req.check('amount', 'ราคารวมไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').isNumeric();
    var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/pay/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE pay SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,pay) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลสำเร็จ";
        res.redirect('/pay');
      }
    });
   });
  }
 }
};


controller.pay = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE pay set status = 1 WHERE id = ? AND apartment_id = ? ',[id,req.session.apmid],(err,pay) => {
        if(err){
          res.json(err);
        }
        res.redirect('/pay');
      });
   });
  }
};

module.exports = controller;
