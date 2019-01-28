
const controller ={};


controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT furniture.id AS No,room.name as Rname, furniture.name as Fname,furnituretype.name as FTname, furniture.usable as usa,apartment.name as Apname FROM furniture JOIN room ON furniture.room_id = room.id JOIN furnituretype ON furniture.furnituretype_id = furnituretype.id JOIN apartment ON furniture.apartment_id = apartment.id WHERE furniture.apartment_id = ?',[req.session.apmid],(err,furnitures) =>{
        if(err){
          res.json(err);
        }
      res.render('furnitures',{data:furnitures});
        });
    });
  }
};


controller.new = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const data = null;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM  room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
      conn.query('SELECT * FROM  furnituretype WHERE apartment_id = ?',[req.session.apmid],(err,furnituretype) => {
        conn.query('SELECT * FROM  apartment WHERE id = ?',[req.session.apmid],(err,apartment) => {
          res.render('furnitureForm',{
            data1:room,data2:furnituretype,data3:apartment,data4:data
            });
          });
        });
      });
    });
  }
};

controller.save = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('room_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('name', 'เฟอร์นิเจอร์ไม่ถูกต้อง !').notEmpty();
    req.check('price', 'ราคาไม่ถูกต้อง !').isNumeric();
    req.check('furnituretype_id', 'ประเภทเฟอร์นิเจอร์ไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/furniture/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO furniture set ?',[data],(err,furnitures) => {
        if(err){
          res.json(err);
        }
      res.redirect('/furniture');
      });
    });
  }
 } 
};


controller.delete = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM furniture WHERE id= ? WHERE apartment_id = ?',[id,req.session.apmid],(err,furnitures) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลห้องพักสำเร็จ";
        res.redirect('/furniture');
        }
      });
    });
  }
};


controller.edit = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const {id} = req.params;
      req.getConnection((err,conn) => {
        conn.query('SELECT * FROM  room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
        conn.query('SELECT * FROM  furnituretype WHERE apartment_id = ?',[req.session.apmid],(err,furnituretype) => {
          conn.query('SELECT * FROM  apartment WHERE id = ?',[req.session.apmid],(err,apartment) => {
            conn.query('SELECT * FROM furniture WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,furnitures) => {
            res.render('furnitureForm',{
              data1:room,data2:furnituretype,data3:apartment,data4:furnitures
                });
              });
            });
          });
        });
      });
    }
};



controller.update = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    const data = req.body;
    req.check('room_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('name', 'เฟอร์นิเจอร์ไม่ถูกต้อง !').notEmpty();
    req.check('price', 'ราคาไม่ถูกต้อง !').isNumeric();
    req.check('furnituretype_id', 'ประเภทเฟอร์นิเจอร์ไม่ถูกต้อง !').notEmpty();
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
      conn.query('UPDATE furniture Set ? WHERE id = ? AND apartment_id',[data,id,req.session.apmid],(err,furnitures) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลห้องพักสำเร็จ";
        res.redirect('/furniture');
      }
    });
   });
  }
 }
};


module.exports = controller;
