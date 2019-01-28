const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT contract.id as No,room.name as Rname,apartment.name as Apname,contract.room_price as Rprice,contract.contract_date as Cdate,contract.bail as Bail,contract.min_month as Mmonth,contract.electric_meter as Emeter,contract.water_meter as Wmeter,customer.name as Cname,contract.status as Status,contract.end_date as Edate FROM contract JOIN room ON contract.room_id = room.id JOIN apartment ON contract.apartment_id = apartment.id JOIN customer ON contract.customer_id = customer.id where contract.apartment_id = ?',[req.session.apmid] ,(err,contract) => {
        if(err){
          res.json(contract);
        }
        res.render('contracts', {
          data:contract

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
            conn.query('SELECT * FROM customer WHERE apartment_id = ?',[req.session.apmid],(err,customer) => {
            res.render('contractForm',{
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
    req.check('room_id', 'ประเภทห้องไม่ถูกต้อง !').notEmpty();
    req.check('customer_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('room_price', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('contract_date', 'วันที่ทำสัญญาไม่ถูกต้อง !').notEmpty();
    req.check('bail', 'เงินประกันถูกต้อง !').isNumeric();
    req.check('min_month', 'สัญญากี่เดือนไม่ถูกต้อง !').notEmpty();
    req.check('electric_meter', 'ราคาค่าไฟต่อหน่วยไม่ถูกต้อง !').isNumeric();
    req.check('water_meter', 'ราคาค่าน้ำต่อหน่วยไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
    req.check('end_date', 'วันที่หมดสัญญาไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/contract/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data=req.body
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO contract set ?',[data],(err,contract) =>{
        if(err){
          res.json(err);
        }
        res.redirect('/contract');
      });
    });
  }
 }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM contract WHERE id = ? AND apartment_id = ?',[id ,req.session.apmid],(err,contract) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/contract');
        }
      });
    });
  }
};

controller.edit = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const {id} = req.params;
      req.getConnection((err,conn) => {
        conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
          conn.query('SELECT * FROM room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
           conn.query('SELECT * FROM customer WHERE apartment_id = ?',[req.session.apmid],(err,customer) => {
            conn.query('SELECT * FROM contract WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, contract) => {
              res.render('contractForm',{
                  data1:apartment,data2:room,data3:customer,data4:contract
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
    req.check('room_id', 'ประเภทห้องไม่ถูกต้อง !').notEmpty();
    req.check('customer_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('room_price', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('contract_date', 'วันที่ทำสัญญาไม่ถูกต้อง !').notEmpty();
    req.check('bail', 'เงินประกันถูกต้อง !').isNumeric();
    req.check('min_month', 'สัญญากี่เดือนไม่ถูกต้อง !').notEmpty();
    req.check('electric_meter', 'ราคาค่าไฟต่อหน่วยไม่ถูกต้อง !').isNumeric();
    req.check('water_meter', 'ราคาค่าน้ำต่อหน่วยไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
    req.check('end_date', 'วันที่หมดสัญญาไม่ถูกต้อง !').notEmpty();
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
      conn.query('UPDATE contract SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,contract) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลสำเร็จ";
        res.redirect('/contract');
      }
    });
   });
  }
 }
};
module.exports = controller;
