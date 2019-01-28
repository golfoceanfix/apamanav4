const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT bill.id AS No,apartment.name AS Apname,room.name AS Rname ,customer.name AS Cname ,bill.internetprice AS internetprice,bill.electricprice AS electricprice,bill.waterprice AS waterprice,bill.serviceprice AS serviceprice,bill.trashprice AS trashprice,bill.roomprice AS roomprice,bill.fine AS fine,bill.month AS month,bill.year AS year,bill.date AS date FROM bill JOIN apartment ON bill.apartment_id = apartment.id JOIN room ON bill.room_id = room.id JOIN contract ON bill.contract_id =contract.id JOIN customer ON contract.customer_id = customer.id WHERE bill.apartment_id = ?',[req.session.apmid] ,(err,bill) => {
        if(err){
          res.json(bill);
        }
        res.render('bills', {
          data:bill

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
            conn.query('SELECT contract.id,customer.name AS name FROM contract JOIN customer ON contract.customer_id = customer.id WHERE contract.apartment_id = ?',[req.session.apmid],(err,customer) => {
            res.render('billForm',{
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
    req.check('contract_id', 'ชื่อผู้ทำสัญญาไม่ถูกต้อง !').notEmpty();
    req.check('electricprice', 'หน่วยไฟไม่ถูกต้อง !').isNumeric();
    req.check('waterprice', 'หน่วยน้ำไม่ถูกต้อง !').isNumeric();
    req.check('trashprice', 'ค่าขยะไม่ถูกต้อง !').isNumeric();
    req.check('roomprice', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('fine', 'ค่าปรับไม่ถูกต้อง !').isNumeric();
    req.check('month', 'เดือนไม่ถูกต้อง !').notEmpty();
    req.check('year', 'ปีไม่ถูกต้อง !').notEmpty();
    req.check('date', 'วันที่ออกบิลไม่ถูกต้อง !').notEmpty();
        var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/bill/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data=req.body
    console.log(data);
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO bill SET ?',[data],(err,contract) =>{
        if(err){
          res.json(err);
        }
        res.redirect('/bill');
      });
    });
  }
 }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM bill WHERE id = ? AND apartment_id = ?',[id ,req.session.apmid],(err,monthlywater) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/bill');
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
              conn.query('SELECT * FROM bill WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,bill) =>{
            res.render('billForm',{
                  data1:apartment,data2:room,data3:customer,data4:bill
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
    req.check('contract_id', 'ชื่อผู้ทำสัญญาไม่ถูกต้อง !').notEmpty();
    req.check('electricprice', 'หน่วยไฟไม่ถูกต้อง !').isNumeric();
    req.check('waterprice', 'หน่วยน้ำไม่ถูกต้อง !').isNumeric();
    req.check('trashprice', 'ค่าขยะไม่ถูกต้อง !').isNumeric();
    req.check('roomprice', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('fine', 'ค่าปรับไม่ถูกต้อง !').isNumeric();
    req.check('month', 'เดือนไม่ถูกต้อง !').notEmpty();
    req.check('year', 'ปีไม่ถูกต้อง !').notEmpty();
    req.check('date', 'วันที่ออกบิลไม่ถูกต้อง !').notEmpty();
    var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/bill/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE bill SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,bill) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลสำเร็จ";
        res.redirect('/bill');
      }
    });
   });
  }
 }
};


module.exports = controller;
