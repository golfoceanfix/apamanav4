const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) =>{
      conn.query('SELECT u.name AS Nameutility,u.detail AS Detail,u.package AS Package,u.price AS Price,a.name AS Namepartment,u.id AS id FROM utility AS u JOIN apartment AS a ON u.apartment_id=a.id ',(err,utilitys) => {
        if(err){
          res.json(err);
        }
        res.render('./admin/utilitys',{
          data:utilitys
        })
      });
    });
  }
};

controller.new = (req,res) =>{
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = null;
    req.getConnection((err,conn) =>{
      conn.query('SELECT * FROM apartment',(err,apartment)=>{
        res.render('./admin/utilityForm',{
          data1:apartment,data2:data
        });
      });
    });
  }
};

controller.save = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = req.body;
      req.getConnection((err,conn) =>{
        conn.query('INSERT INTO utility set ?',[data],(err,utilitys)=>{
        if(err){
          ers.json(err);
        }
        console.log(utilitys);
        res.redirect('/admin/utility');
        });
      });
    }
};

controller.delete = (req , res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      req.getConnection((err, conn) => {
        conn.query('DELETE FROM utility WHERE id= ?',[id],(err,utilitys) => {
          if(err){
            res.json(err);
          }
          console.log(utilitys);
          res.redirect('/admin/utility');
        });
      });
    }
};

controller.edit = (req,res) =>{
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) =>{
      conn.query('SELECT * FROM apartment',(err,apartment)=>{
        conn.query('SELECT * FROM utility WHERE id = ?',[id],(err,utility) =>{
        res.render('./admin/utilityForm',{
          data1:apartment,data2:utility
          });
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
      conn.query('UPDATE utility  Set ? WHERE id = ? ',[data,id],(err,utilitys) => {
        if(err){
          res.json(err);
        }
        res.redirect('/admin/utility');
      });
    });
  }
};


module.exports = controller;
