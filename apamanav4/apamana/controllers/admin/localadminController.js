const controller = {};

controller.list = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      req.getConnection((err,conn) => {
        conn.query('SELECT localadmin.id as No,localadmin.username as Username,localadmin.password as Password FROM localadmin', (err,localadmin) => {
          if(err){
            res.json(localadmin);
          }
          res.render('./admin/localadmins', {
            data:localadmin
          });
        });
      });
    }
};

controller.new = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = null;
      res.render('./admin/localadminForm',{
        data:data
      });
    }
};


controller.save = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = req.body;
      req.getConnection((err, conn) => {
        conn.query('INSERT INTO localadmin set ?',[data],(err,localadmin) => {
          if(err){
            res.json(err);
          }
          console.log(localadmin);
          res.redirect('/admin/localadmin');
        });
      });
    }
};

controller.delete = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM localadmin WHERE id= ?',[id],(err,localadmin) => {
        if(err){
          res.json(err);
        }
        console.log(localadmin);
        res.redirect('/admin/localadmin');
      });
    });
  }
};

controller.edit = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM localadmin WHERE id = ? ',[id],(err,localadmin) => {
        if(err){
          res.json(err);
        }
        res.render('localadminForm',{
        data:localadmin[0]
        });
      });
    });
  }
};

controller.update = (req , res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      const data = req.body;
      req.getConnection((err, conn) => {
        conn.query('UPDATE localadmin  Set ? WHERE id = ? ',[data,id],(err,localadmin) => {
          if(err){
            res.json(err);
          }
          res.redirect('/admin/localadmin');
        });
      });
    }
};

module.exports = controller;
