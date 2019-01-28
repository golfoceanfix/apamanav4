const controller= {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM repairtype',(err,repairtype) =>{
        if(err){
          res.json(err);
        }
      res.render('./admin/repairtypes',{data:repairtype});

        });
    });
  }
};

controller.save = (req , res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = req.body;
      req.getConnection((err, conn) => {
        conn.query('INSERT INTO repairtype set ?',[data],(err,repairtype) => {
          if(err){
            res.json(err);
          }
          console.log(repairtype);
        res.redirect('/admin/repairtype');
        });
      });
    }
};

controller.delete = (req , res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      req.getConnection((err, conn) => {
        conn.query('DELETE FROM repairtype WHERE id= ?',[id],(err,repairtype) => {
          if(err){
            res.json(err);
          }
          console.log(repairtype);
          res.redirect('/admin/repairtype');
        });
      });
    }
};

controller.edit = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM repairtype WHERE id = ? ',[id],(err,repairtype) => {
        if(err){
          res.json(err);
        }
        res.render('./admin/repairtypeForm',{
        data:repairtype[0]
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
      conn.query('UPDATE repairtype  Set ? WHERE id = ? ',[data,id],(err,repairtype) => {
        if(err){
          res.json(err);
        }
        res.redirect('/admin/repairtype');
      });
    });
  }
};

controller.new = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = null;
    res.render('./admin/repairtypeForm',{
      data:data
    });
  }
};

module.exports = controller;
