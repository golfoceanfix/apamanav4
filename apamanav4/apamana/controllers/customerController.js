const controller = {};

controller.list = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      req.getConnection((err,conn) => {
        conn.query('SELECT customer.id as No,customer.id_card as Idcard,customer.name as Cname,customer.address as Address,customer.phone as Phone,customer.position as Position,customer.organize as Organize,apartment.name as Apname FROM customer JOIN apartment ON customer.apartment_id = apartment.id WHERE customer.apartment_id = ?',[req.session.apmid], (err,customer) => {
          if(err){
            res.json(customer);
          }
          res.render('customers', {
            data:customer
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
        conn.query('SELECT * FROM customer WHERE apartment_id = ?',[req.session.apmid],(err, customer)=>{
        res.render('customerForm',{
          data1:apartment,data2:data
        });
       });
      });
    });
  }
};

controller.save = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('id_card', 'บัตรประชาชนไม่ถูกต้อง !').isNumeric();
    req.check('name', 'ชื่อไม่ถูกต้องไม่ถูกต้อง !').notEmpty();
    req.check('address', 'ที่อยู่ไม่ถูกต้อง !').notEmpty();
    req.check('phone', 'โทรศัพท์ไม่ถูกต้อง !').isNumeric();
    req.check('position', 'ตำแหน่งไม่ถูกต้อง !').notEmpty();
    req.check('organize', 'หน่วยงานไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/customer/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO customer set ?',[data],(err,customer) => {
        if(err){
          res.json(err);
        }
        res.redirect('/customer');
      });
    });
  }
 }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM customer WHERE id = ? AND apartment_id',[id,req.session.apmid],(err,customer) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/customer');
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
        conn.query('SELECT * FROM customer WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, customer) => {
          res.render('customerForm',{
          data1:apartment,data2:customer
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
      req.check('id_card', 'บัตรประชาชนไม่ถูกต้อง !').isNumeric();
      req.check('name', 'ชื่อไม่ถูกต้องไม่ถูกต้อง !').notEmpty();
      req.check('address', 'ที่อยู่ไม่ถูกต้อง !').notEmpty();
      req.check('phone', 'โทรศัพท์ไม่ถูกต้อง !').isNumeric();
      req.check('position', 'ตำแหน่งไม่ถูกต้อง !').notEmpty();
      req.check('organize', 'หน่วยงานไม่ถูกต้อง !').notEmpty();
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
        conn.query('UPDATE customer SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,customer) => {
          if(err){
            res.json(err);
          }
          res.redirect('/customer');
        });
      });
    }
  }
};

module.exports = controller;
