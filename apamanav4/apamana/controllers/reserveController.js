const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT reserve.id as No, room.name as Rname,apartment.name as Apname,reserve.name as Name,reserve.address as Address,reserve.phone as Phone,reserve.date_reserve as Datere,reserve.date_outtime as Outtime,reserve.room_price as Price,reserve.balance_reserve as Balance,reserve.status as Status,reserve.id_card as Idcard,reserve.date_in Datein FROM reserve JOIN room ON reserve.room_id = room.id JOIN apartment ON reserve.apartment_id = apartment.id WHERE reserve.apartment_id = ?',[req.session.apmid], (err,reserve) => {
        if(err){
          res.json(reserve);
        }
        res.render('reserves', {
          data:reserve

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
        conn.query('SELECT * FROM room WHERE apartment_id =?',[req.session.apmid],(err,room) => {
          res.render('reserveForm',{
            data1:apartment,data2:room,data3:data
           });
        });
      });
    });
  }
};

controller.save = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('room_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('name', 'ชื่อผู้จองไม่ถูกต้อง !').notEmpty();
    req.check('address', 'ที่อยู่ไม่ถูกต้อง !').notEmpty();
    req.check('date_reserve', 'วันที่จองไม่ถูกต้อง !').notEmpty();
    req.check('date_outtime', 'วันที่หมดจองไม่ถูกต้อง !').notEmpty();
    req.check('phone', 'เบอร์โทรถูกต้อง !').isNumeric();
    req.check('room_price', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('balance_reserve', 'เงินจองไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
    req.check('id_card', 'เลขบัตรประชาชนไม่ถูกต้อง !').isNumeric();
    req.check('date_in', 'วันที่เข้าอยู่ไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/reserve/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data=req.body
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO reserve set ?',[data],(err,reserve) =>{
        if(err){
          res.json(err);
        }
        res.redirect('/reserve');
      });
    });
  }
 }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM reserve WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,reserve) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/reserve');
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
          conn.query('SELECT * FROM reserve WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, reserve) => {
            res.render('reserveForm',{
                data1:apartment,data2:room,data3:reserve
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
    req.check('name', 'ชื่อผู้จองไม่ถูกต้อง !').notEmpty();
    req.check('address', 'ที่อยู่ไม่ถูกต้อง !').notEmpty();
    req.check('phone', 'เบอร์โทรถูกต้อง !').isNumeric();
    req.check('date_reserve', 'วันที่จองไม่ถูกต้อง !').notEmpty();
    req.check('date_outtime', 'วันที่หมดจองไม่ถูกต้อง !').notEmpty();
    req.check('room_price', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('balance_reserve', 'เงินจองไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
    req.check('id_card', 'เลขบัตรประชาชนไม่ถูกต้อง !').isNumeric();
    req.check('date_in', 'วันที่เข้าอยู่ไม่ถูกต้อง !').notEmpty();
      var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/reserve/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
      req.getConnection((err, conn) => {
        conn.query('UPDATE reserve SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,reserve) => {
          if(err){
            res.json(err);
          }
          res.redirect('/reserve');
        });
      });
    }
 };
};

module.exports = controller;
