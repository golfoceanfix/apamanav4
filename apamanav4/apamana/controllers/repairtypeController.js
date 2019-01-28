const controller= {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM repairtype WHERE apartment_id = ?',[req.session.apmid],(err,repairtype) =>{
        if(err){
          res.json(err);
        }
      res.render('repairtypes',{data:repairtype});

        });
    });
  }
};

controller.save = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('name', 'ชื่อประเภทอุปกรณ์ไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/repairtype/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO repairtype set ?',[data],(err,repairtype) => {
        if(err){
          res.json(err);
        }
      res.redirect('/repairtype');
      });
    });
  }
 }
};

controller.delete = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM repairtype WHERE id= ? AND apartment_id = ?',[id,req.session.apmid],(err,repairtype) => {
        if(err){
          res.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/repairtype');
        }
      });
    });
  }
};

controller.edit = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {

    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('SELECT * from apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
        conn.query('SELECT * FROM repairtype WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,repairtype) => {
         res.render('repairtypeForm',{
        data1:apartment,data:repairtype
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
      req.check('name', 'ชื่อประเภทอุปกรณ์ไม่ถูกต้อง !').notEmpty();
      var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/repairtype/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
      req.getConnection((err, conn) => {
        conn.query('UPDATE repairtype  Set ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,repairtype) => {
          if(err){
            res.json(err);
          }
          res.redirect('/repairtype');
        });
      });
    }
  }
};

controller.new = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const data = null;
    req.getConnection((err,conn) => {
      conn.query('SELECT * from apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
          conn.query('SELECT * FROM repairtype WHERE apartment_id = ?',[req.session.apmid],(err,repairtype) =>{
    res.render('repairtypeForm',{
      data1:apartment,data:data
    });
  });
 });
});
 }
};

module.exports = controller;
