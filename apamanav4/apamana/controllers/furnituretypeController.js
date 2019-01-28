const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT furnituretype.id AS No,furnituretype.name AS FTname,furnituretype.detail AS detail,apartment.name AS Apname FROM furnituretype JOIN apartment ON furnituretype.apartment_id = apartment.id WHERE furnituretype.apartment_id = ?',[req.session.apmid], (err,furnituretype) => {
        if(err){
          res.json(furnituretype);
        }
        res.render('furnituretypes', {
          data:furnituretype

        });
      });
    });
  }
};

controller.new = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const data = null;
      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
          conn.query('SELECT * FROM furnituretype WHERE apartment_id = ?',[req.session.apmid],(err,furnituretype )=>{
          res.render('furnituretypeForm',{
            data1:apartment,data2:data
          });
         });
        });
      });
    }
};

controller.save = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('name', 'ประเภทเฟอร์นิเจอร์ไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/furnituretype/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO furnituretype set ?',[data],(err,furnituretype) => {
        if(err){
          res.json(err);
        }
        res.redirect('/furnituretype');
      });
    });
  }
 } 
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM furnituretype WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,furnituretype) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/furnituretype');
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
        conn.query('SELECT * FROM furnituretype WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, furnituretype) => {
          res.render('furnituretypeForm',{
          data1:apartment,data2:furnituretype
          });
        });
      });
    });
  }
};

controller.update = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const {id} = req.params;
      req.check('name', 'ประเภทเฟอร์นิเจอร์ไม่ถูกต้อง !').notEmpty();
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
        conn.query('UPDATE furnituretype SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,furnituretype) => {
          if(err){
            res.json(err);
          }else {
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลห้องพักสำเร็จ";
          res.redirect('/furnituretype');
        }
      });
     });
    }
   }
  };

module.exports = controller;
