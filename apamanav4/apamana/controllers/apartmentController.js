const controller= {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')} else {
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err,apartments) =>{
        if(err){
          res.json(err);
        } else {
          res.render('apartments',{data:apartments});
        }

        });

    });
  }
};

controller.save = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins') } else {
    req.check('ContactName', 'ชื่อผู้ติดต่อบริจาคไม่ถูกต้อง !').notEmpty();
    req.check('pid', 'ชื่อผู้ติดต่อไม่ถูกต้อง !').notEmpty();
    req.check('ContactMobile', 'เบอร์โทรศัพท์ไม่ถูกต้อง !').isNumeric();
    req.check('Date', 'วันที่ไม่ถูกต้อง !').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
      res.redirect('/contact/new');
    } else {
      req.session.success = true;
      req.session.topic = "เพิ่มข้อมูลสำเร็จ";
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO apartment set ?',[data],(err,apartments) => {
        if(err){
          res.json(err);
        }
      res.redirect('/apartment');
      });
    });
  }
 }
};

controller.delete = (req , res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins') } else {
      const {id} = req.params;
      req.getConnection((err, conn) => {
        conn.query('DELETE FROM apartment WHERE id= ? AND WHERE id = ?',[id,req.session.apmid],(err,apartments) => {
          if(err){
            res.json(err);
          }
          res.redirect('/apartment');
        });
      });
    }
};

controller.edit = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins') } else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM apartment WHERE id = ?',[id],(err,apartments) => {
        if(err){
          res.json(err);
        }
        res.render('apartmentForm',{
        data:apartments[0]
        });
      });
    });
  }
};

controller.update = (req , res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins') } else {
    const {id} = req.params;
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE apartment  Set ? WHERE id = ? ',[data,id],(err,apartments) => {
        if(err){
          res.json(err);
        }
        res.redirect('/apartment');
      });
    });
  }
};

controller.new = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins') } else {
    const data = null;
    res.render('apartmentForm',{
      data:data
    });
  }
};

module.exports = controller;
