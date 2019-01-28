
const controller ={};


controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT apartment.name AS Apname, room.name AS Rname, customer.name AS Cname, movein.date as Date, movein.status AS Status, movein.id AS No FROM movein JOIN apartment ON movein.apartment_id = apartment.id JOIN room ON movein.room_id = room.id JOIN contract ON movein.contract_id = contract.id JOIN customer ON contract.customer_id = customer.id WHERE movein.apartment_id = ?',[req.session.apmid], (err,movein) => {
        if(err){
          res.json(movein);
        }
        res.render('moveins', {
          data:movein

        });
      });
    });
  }
};


controller.new = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const data = null;
      req.getConnection((err,conn) => {
        conn.query('SELECT * FROM  apartment WHERE id = ?',[req.session.apmid],(err,apartment) => {
        conn.query('SELECT * FROM  room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
          conn.query('SELECT customer.name,contract.id FROM  contract JOIN customer ON contract.customer_id = customer.id WHERE contract.apartment_id = ?',[req.session.apmid],(err,customer) => {
            res.render('moveinForm',{
              data1:apartment,data2:room,data3:customer,data4:data
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
    req.check('contract_id', 'ชื่อผู้ทำสัญญาไม่ถูกต้อง !').notEmpty();
    req.check('date', 'วันที่ย้ายเข้าไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/movein/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO movein set ?',[data],(err,movein) => {
        if(err){
          res.json(err);
        }
      res.redirect('/movein');
      });
    });
  }
 }
};


controller.delete = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM movein WHERE id= ? AND apartment_id',[id,req.session.apmid],(err,movein) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/movein');
        }
      });
    });
  }
};


controller.edit = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const {id} = req.params;
      req.getConnection((err,conn) => {
        conn.query('SELECT * FROM  apartment WHERE id = ?',[req.session.apmid],(err,apartment) => {
        conn.query('SELECT * FROM  room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
          conn.query('SELECT customer.name,contract.id FROM  contract JOIN customer ON contract.customer_id = customer.id WHERE contract.apartment_id = ?',[req.session.apmid],(err,customer) => {
            conn.query('SELECT * FROM movein WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,movein) => {
            res.render('moveinForm',{
              data1:apartment,data2:room,data3:customer,data4:movein
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
    req.check('contract_id', 'ชื่อผู้ทำสัญญาไม่ถูกต้อง !').notEmpty();
    req.check('date', 'วันที่ย้ายเข้าไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
    var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/movein/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE movein SET ? WHERE id = ? AND apartment_id = ? ',[data,id,req.session.apmid],(err,movein) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="แก้ไขข้อมูลสำเร็จ";
        res.redirect('/movein');
      }
    });
   });
  }
 }
};


module.exports = controller;
