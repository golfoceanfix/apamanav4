const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) =>{
      conn.query('SELECT utility.name AS Name,utility.detail AS Detail,utility.package AS Package,utility.price AS Price,apartment.name AS Namepartment,utility.id AS id FROM utility JOIN apartment ON utility.apartment_id = apartment.id WHERE utility.apartment_id = ?',[req.session.apmid],(err,utilitys) => {
        if(err){
          res.json(err);
        }
        res.render('utilitys',{
          data:utilitys
        })
      });
    });
  }
};

controller.new = (req,res) =>{
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const data = null;
    req.getConnection((err,conn) =>{
      conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
        res.render('utilityForm',{
          data1:apartment,data2:data
        });
      });
    });
  }

};

controller.save = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.check('name', 'ชื่อประเภทไม่ถูกต้อง !').notEmpty();
    req.check('package', 'แพ๊คเก็ทไม่ถูกต้อง !').notEmpty();
    req.check('price', 'ราคาต่อหน่วยไม่ถูกต้อง !').isNumeric();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/utility/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
      const data = req.body;
      req.getConnection((err,conn) =>{
        conn.query('INSERT INTO utility set ?',[data],(err,utilitys)=>{
        if(err){
          ers.json(err);
        }else {
          req.session.success=true;
          req.session.topic="ลบข้อมูลสำเร็จ";
        res.redirect('/utility');
         }
        });
      });
    }
  }
};

controller.delete = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM utility WHERE id= ? AND apartment_id = ?',[id,req.session.apmid],(err,utilitys) => {
        if(err){
          res.json(err);
        }
        res.redirect('/utility');
      });
    });
  }
};

controller.edit = (req,res) =>{
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err,conn) =>{
      conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
        conn.query('SELECT * FROM utility WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,utility) =>{
        res.render('utilityForm',{
          data1:apartment,data2:utility
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
      req.check('name', 'ชื่อประเภทไม่ถูกต้อง !').notEmpty();
      req.check('package', 'แพ๊คเก็ทไม่ถูกต้อง !').notEmpty();
      req.check('price', 'ราคาต่อหน่วยไม่ถูกต้อง !').isNumeric();
var errors=req.validationErrors();
if(errors){
req.session.errors=errors;
req.session.success=false;
res.redirect('/utility/update/'+id);
}else{
req.session.success=true;
const{id} =req.params;
const data=req.body;
      req.getConnection((err, conn) => {
        conn.query('UPDATE utility  Set ? WHERE id = ? AND apartment_id = ? ',[data,id,req.session.apmid],(err,utilitys) => {
          if(err){
            res.json(err);
          }else {
            req.session.success=true;
            req.session.topic="แก้ไขข้อมูลห้องพักสำเร็จ";
          res.redirect('/utility');
          }
        });
      });
     }
    }
   };
module.exports = controller;
