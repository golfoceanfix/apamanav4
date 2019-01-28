const controller= {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err,apartments) =>{
        if(err){
          res.json(err);
        }
      res.render('./admin/apartments',{data:apartments});

        });
    });
  }
};

controller.save = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO apartment set ?',[data],(err,apartments) => {
        if(err){
          res.json(err);
        }
        console.log(apartments);
      res.redirect('/admin/apartment');
      });
    });
  }
};

controller.delete = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM apartment WHERE id= ?',[id],(err,apartments) => {
        if(err){
          res.json(err);
        }
        console.log(apartments);
        res.redirect('/admin/apartment');
      });
    });
  }
};

controller.edit = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM apartment WHERE id = ? ',[id],(err,apartments) => {
        if(err){
          res.json(err);
        }
        res.render('./admin/apartmentForm',{
        data:apartments[0]
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
      conn.query('UPDATE apartment  Set ? WHERE id = ? ',[data,id],(err,apartments) => {
        if(err){
          res.json(err);
        }
        res.redirect('/admin/apartment');
      });
    });
  }
};

controller.new = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = null;
      res.render('./admin/apartmentForm',{
        data:data
      });
    }
};

module.exports = controller;
