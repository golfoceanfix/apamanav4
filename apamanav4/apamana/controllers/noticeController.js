const controller ={};


controller.list = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      req.getConnection((err,conn) => {
        conn.query('SELECT notice.id as No,apartment.name as Apname,room.name as Rname,customer.name as Cname,notice.date as Date,notice.out_date as Odate,notice.status as Status FROM notice JOIN apartment ON notice.apartment_id = apartment.id JOIN room ON notice.room_id = room.id JOIN contract ON notice.contract_id = contract.id JOIN customer ON contract.customer_id = customer.id WHERE notice.apartment_id = ?',[req.session.apmid], (err,notice) => {
          if(err){
            res.json(notice);
          }
          res.render('notices', {
            data:notice
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
        conn.query('SELECT contract.id,customer.name AS name FROM contract JOIN customer ON contract.customer_id = customer.id WHERE contract.apartment_id = ?',[req.session.apmid],(err,customer) => {
          res.render('noticeForm',{
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
    req.check('contract_id', 'ชื่อผู้่ทำสัญญาไม่ถูกต้อง !').notEmpty();
    req.check('date', 'วันที่แจ้งไม่ถูกต้อง !').isNumeric();
    req.check('out_date', 'วันที่ออกไม่ถูกต้อง !').notEmpty();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/notice/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO notice SET ?',[data],(err,notice) => {
        if(err){
          res.json(err);
        }
      res.redirect('/notice');
      });
    });
  }
 }
};



controller.delete = (req , res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const {id} = req.params;
      req.getConnection((err, conn) => {
        conn.query('DELETE FROM notice WHERE id= ? AND apartment_id = ?',[id,req.session.apmid],(err,notice) => {
          if(err){
            res.json(err);
          }else {
            req.session.success=true;
            req.session.topic="ลบข้อมูลสำเร็จ";
          res.redirect('/notice');
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
        conn.query('SELECT customer.id,customer.name FROM contract JOIN customer ON contract.customer_id = customer.id WHERE contract.apartment_id = ?',[req.session.apmid],(err,customer) => {
          conn.query('SELECT * FROM notice WHERE id = ? AND apartment_id',[id,req.session.apmid],(err,notice) => {
          res.render('noticeForm',{
            data1:apartment,data2:room,data3:customer,data4:notice
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
      req.check('contract_id', 'ชื่อผู้่ทำสัญญาไม่ถูกต้อง !').notEmpty();
      req.check('date', 'วันที่แจ่้งไม่ถูกต้อง !').isNumeric();
      req.check('out_date', 'วันที่ออกไม่ถูกต้อง !').notEmpty();
      req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
      var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/notice/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
      req.getConnection((err, conn) => {
        conn.query('UPDATE notice SET ? WHERE id = ? AND apartment_id',[data,id,req.session.apmid],(err,notice) => {
          if(err){
            res.json(err);
          }
          else {
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลสำเร็จ";
          res.redirect('/notice');
        }
      });
     });
    }
   }
  };




module.exports = controller;
