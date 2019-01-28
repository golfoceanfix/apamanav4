const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT apartment.name as apartmentname, user.name, user.username, user.password, user.detail, user.id FROM user JOIN apartment ON user.apartment_id = apartment.id WHERE user.apartment_id = ?',[req.session.apmid], (err,user) => {
        if(err){
          res.json(user);
        }
        res.render('users', {
          data:user

        });
      });
    });
  }
};

controller.new = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const data = null;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err, apartment)=>{
        res.render('userForm',{
          data1:apartment,data2:data
        });
      });
    });
  }
};

controller.save = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO user set ?',[data],(err,user) => {
        if(err){
          res.json(err);
        }
        res.redirect('/user');
      });
    });
  }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM user WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,user) => {
        if(err){
          res.json(err);
        }
        res.redirect('/user');
      });
    });
  }
};

controller.edit = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err, apartment)=>{
        conn.query('SELECT * FROM user WHERE id = ? AND apartment_id',[id,req.session.apmid],(err, user) => {
          res.render('userForm',{
          data1:apartment,data2:user
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
    req.getConnection((err, conn) => {
      conn.query('UPDATE user SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,user) => {
        if(err){
          res.json(err);
        }
        res.redirect('/user');
      });
    });
  }
};

module.exports = controller;
