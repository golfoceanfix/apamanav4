
const controller ={};


controller.list = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      req.getConnection((err,conn) => {
        conn.query('SELECT moveout.id AS No,moveout.apartment_id AS Apname,customer.name AS Cname,room.name AS Rname,moveout.date_out AS Dateout,moveout.electric_meter AS Emeter,moveout.water_meter AS Wmeter,moveout.electric_price AS Eprice,moveout.water_price AS Wprice,moveout.trash_price AS Tprice,moveout.internet_price AS Iprice,moveout.fine AS Fine,moveout.bail_back AS Billback,moveout.status AS Status FROM moveout JOIN apartment ON moveout.apartment_id = apartment.id JOIN contract ON moveout.contract_id = contract.id JOIN customer ON contract.customer_id = customer.id JOIN room ON contract.room_id = room.id JOIN notice ON moveout.notice_id = notice.id WHERE moveout.apartment_id = ?',[req.session.apmid], (err,moveout) => {
          if(err){
            res.json(moveout);
          }
          res.render('moveouts', {
            data:moveout

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
        conn.query('SELECT notice.id,room.name AS Rname FROM notice JOIN room ON notice.room_id = room.id WHERE notice.apartment_id = ?',[req.session.apmid],(err,room) =>{
          conn.query('SELECT contract.id,customer.name AS Cname FROM contract JOIN customer ON contract.customer_id = customer.id WHERE contract.apartment_id = ?',[req.session.apmid],(err,customer) => {
          res.render('moveoutForm',{
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
    req.check('contract_id', 'ชื่อผู้ทำสัญญาไม่ถูกต้อง !').notEmpty();
    req.check('notice_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('date_out', 'วันที่ย้ายออกไม่ถูกต้อง !').notEmpty();
    req.check('electric_meter', 'หน่วยไฟไม่ถูกต้อง !').isNumeric();
    req.check('water_meter', 'หน่วยน้ำไม่ถูกต้อง !').isNumeric();
    req.check('electric_price', 'ราคาค่าไฟไม่ถูกต้อง !').isNumeric();
    req.check('water_price', 'ราคาค่าน้ำไม่ถูกต้อง !').isNumeric();
    req.check('fine', 'ค่าปรับไม่ถูกต้อง !').isNumeric();
    req.check('bail_back', 'คืนเงินประกันไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/moveout/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
      const data = req.body;
      console.log(data);
      req.getConnection((err, conn) => {
        conn.query('INSERT INTO moveout SET ?',[data],(err,moveout) => {
          if(err){
            res.json(err);
          }
        res.redirect('/moveout');
        });
      });
    }
  }
};


controller.delete = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM moveout WHERE id= ? AND apartment_id = ?',[id,req.session.apmid],(err,moveout) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/moveout');
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
        conn.query('SELECT notice.id,room.name AS Rname FROM notice JOIN room ON notice.room_id = room.id WHERE notice.apartment_id = ?',[req.session.apmid],(err,room) =>{
          conn.query('SELECT contract.id,customer.name AS Cname FROM contract JOIN customer ON contract.customer_id = customer.id WHERE contract.apartment_id = ?',[req.session.apmid],(err,customer) => {
          conn.query('SELECT * FROM moveout WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,moveout) => {
          res.render('moveoutForm',{
            data1:apartment,data2:room,data3:customer,data4:moveout
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
    req.check('contract_id', 'ชื่อผู้ทำสัญญาไม่ถูกต้อง !').notEmpty();
    req.check('notice_id', 'หมายเลขห้องไม่ถูกต้อง !').notEmpty();
    req.check('date_out', 'วันที่ย้ายออกไม่ถูกต้อง !').notEmpty();
    req.check('electric_meter', 'หน่วยไฟไม่ถูกต้อง !').isNumeric();
    req.check('water_meter', 'หน่วยน้ำไม่ถูกต้อง !').isNumeric();
    req.check('electric_price', 'ราคาค่าไฟไม่ถูกต้อง !').isNumeric();
    req.check('water_price', 'ราคาค่าน้ำไม่ถูกต้อง !').isNumeric();
    req.check('fine', 'ค่าปรับไม่ถูกต้อง !').isNumeric();
    req.check('bail_back', 'คืนเงินประกันไม่ถูกต้อง !').isNumeric();
    req.check('status', 'สถานะไม่ถูกต้อง !').notEmpty();
      var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/moveout/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
      req.getConnection((err, conn) => {
        conn.query('UPDATE moveout Set ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,moveout) => {
          if(err){
            res.json(err);
          }else {
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลสำเร็จ";
          res.redirect('/moveout');
        }
      });
     });
    }
   }
  };

module.exports = controller;
