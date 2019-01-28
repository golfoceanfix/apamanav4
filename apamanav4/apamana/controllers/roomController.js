const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT room.id as No,room.name as Name,apartment.name as Aname,roomtype.name as Rname,room.price as Price,room.floor as Floor,room.usable as Usable,room.detail as Detail from room JOIN apartment on room.apartment_id = apartment.id JOIN roomtype on room.roomtype_id = roomtype.id WHERE apartment.id AND room.apartment_id = ?',[req.session.apmid], (err,room) => {
        if(err){
          res.json(room);
        }
        res.render('rooms', {
          data:room

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
          conn.query('SELECT * FROM roomtype WHERE apartment_id = ?',[req.session.apmid],(err,roomtype) => {
            res.render('roomForm',{
              data1:apartment,data2:roomtype,data3:data
             });
          });
        });
      });
    }
};

controller.save = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('roomtype_id', 'ประเภทห้องไม่ถูกต้อง !').notEmpty();
    req.check('name', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('price', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('floor', 'ชั้นไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/room/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data=req.body
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO room set ?',[data],(err,room) =>{
        if(err){
          res.json(err);
        }
        res.redirect('/room');
      });
    });
  }
 }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM room WHERE id= ? AND apartment_id = ?',[id,req.session.apmid],(err,room) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลห้องพักสำเร็จ";
        res.redirect('/room');
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
        conn.query('SELECT * FROM roomtype WHERE apartment_id',[req.session.apmid],(err,roomtype) => {
          conn.query('SELECT * FROM room WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, room) => {
            res.render('roomForm',{
                data1:apartment,data2:roomtype,data3:room
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
    req.check('roomtype_id', 'ประเภทห้องไม่ถูกต้อง !').notEmpty();
    req.check('name', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('price', 'ราคาห้องไม่ถูกต้อง !').isNumeric();
    req.check('floor', 'ชั้นไม่ถูกต้อง !').notEmpty();
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
      conn.query('UPDATE room SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,room) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลห้องพักสำเร็จ";
        res.redirect('/room');
      }
    });
   });
  }
 }
};

module.exports = controller;
