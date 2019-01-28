
const controller ={};


controller.list = (req,res) => {
    if(typeof req.session.adminid == 'undefined') { res.render('logins'); }else {
      req.getConnection((err,conn) => {
        conn.query('SELECT checkitem.id as No,apartment.name as Apname,room.name as Rname,furniture.name as Fname,checkitem.detail as Detail,checkitem.status as Status FROM checkitem JOIN apartment ON checkitem.apartment_id = apartment.id JOIN furniture ON checkitem.furniture_id = furniture.id JOIN movein ON checkitem.movein_id = movein.id JOIN room ON movein.room_id = room.id WHERE checkitem.apartment_id = ?',[req.session.apmid],(err,checkitem) =>{
          if(err){
            res.json(err);
          }
        res.render('checkitems',{data:checkitem});
          });
      });
    }
};


controller.new = (req,res) => {
  if(typeof req.session.adminid == 'undefined') { res.render('logins'); }else {
    const data = null;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM  apartment WHERE id = ?',[req.session.apmid],(err,apartment) => {
      conn.query('SELECT room.name,movein.id FROM  movein JOIN room ON movein.room_id = room.id WHERE movein.apartment_id = ?',[req.session.apmid],(err,room) => {
        conn.query('SELECT * FROM  furniture WHERE apartment_id = ?',[req.session.apmid],(err,furniture) => {
          res.render('checkitemForm',{
            data1:apartment,data2:room,data3:furniture,data4:data
            });
          });
        });
      });
    });
  }
};

controller.save = (req , res) => {
  if(typeof req.session.adminid == 'undefined') { res.render('logins'); }else {
    req.check('movein_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('furniture_id', 'ชื่อเฟอร์นิเจอร์ไม่ถูกต้อง !').notEmpty();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/checkitem/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO checkitem set ?',[data],(err,checkitem) => {
        if(err){
          res.json(err);
        }
      res.redirect('/checkitem');
      });
    });
  }
 }
};


controller.delete = (req , res) => {
  if(typeof req.session.adminid == 'undefined') { res.render('logins'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM checkitem WHERE id= ? AND apartment_id = ?',[id,req.session.apmid],(err,checkitem) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/checkitem');
        }
      });
    });
  }
};


controller.edit = (req,res) => {
  if(typeof req.session.adminid == 'undefined') { res.render('logins'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM  apartment WHERE id = ?',[req.session.apmid],(err,apartment) => {
      conn.query('SELECT room.name,movein.id FROM  movein JOIN room ON movein.room_id = room.id WHERE movein.apartment_id = ?',[req.session.apmid],(err,movein) => {
        conn.query('SELECT * FROM  furniture WHERE furniture.apartment_id = ?',[req.session.apmid],(err,furniture) => {
          conn.query('SELECT * FROM checkitem WHERE id = ? AND check.apartment_id = ?',[id,req.session.apmid],(err,checkitem) => {
          res.render('checkitemForm',{
          data1:apartment,data2:movein,data3:furniture,data4:checkitem
              });
            });
          });
        });
      });
    });
  }
};



controller.update = (req , res) => {
    if(typeof req.session.adminid == 'undefined') { res.render('logins'); }else {
      const {id} = req.params;
      const data = req.body;
    req.check('movein_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('furniture_id', 'ชื่อเฟอร์นิเจอร์ไม่ถูกต้อง !').notEmpty();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
      var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/checkitem/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
      req.getConnection((err, conn) => {
        conn.query('UPDATE checkitem Set ? WHERE id = ? AND apartment_id = ? ',[data,id,req.session.apmid],(err,checkitem) => {
          if(err){
            res.json(err);
          }else {
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลสำเร็จ";
          res.redirect('/checkitem');
        }
      });
     });
    }
   }
  };

module.exports = controller;
