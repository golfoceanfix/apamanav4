const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT apartment.name as apartmentname, user.name, user.username, user.password, user.detail, user.id FROM user JOIN apartment ON user.apartment_id = apartment.id', (err,user) => {
        if(err){
          res.json(user);
        }
        //console.log(customers);
        res.render('./admin/users', {
          data:user

        });
      });
    });
  }
};

controller.new = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = null;
      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM apartment',(err, apartment)=>{
          res.render('./admin/userForm',{
            data1:apartment,data2:data
          });
        });
      });
    }
};

controller.save = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = req.body;
      req.getConnection((err, conn) => {
        conn.query('INSERT INTO user set ?',[data],(err,user) => {
          if(err){
            res.json(err);
          }
          console.log(user);
          res.redirect('/admin/user');
        });
      });
    }
};

controller.delete = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      req.getConnection((err, conn) => {
        conn.query('DELETE FROM user WHERE id = ?',[id],(err,user) => {
          if(err){
            res.json(err);
          }
          console.log(user);
          res.redirect('/admin/user');
        });
      });
    }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err, apartment)=>{
        conn.query('SELECT * FROM user WHERE id = ?',[id],(err, user) => {
          res.render('./admin/userForm',{
          data1:apartment,data2:user
          });
        });
      });
    });
  }
};

controller.update = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE user SET ? WHERE id = ?',[data,id],(err,user) => {
        if(err){
          res.json(err);
        }
        console.log(user);
        res.redirect('/admin/user');
      });
    });
  }
};

module.exports = controller;
