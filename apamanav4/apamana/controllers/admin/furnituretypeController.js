const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT furnituretype.id AS No,furnituretype.name AS FTname,furnituretype.detail AS detail,apartment.name AS Apname FROM furnituretype JOIN apartment ON furnituretype.apartment_id = apartment.id', (err,furnituretype) => {
        if(err){
          res.json(furnituretype);
        }

        res.render('./admin/furnituretypes', {
          data:furnituretype
        });
      });
    });
  }
};

controller.new = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = null;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM apartment',(err,apartment)=>{
        conn.query('SELECT * FROM furnituretype ',(err,furnituretype )=>{
        res.render('./admin/furnituretypeForm',{
          data1:apartment,data2:data
        });
       });
      });
    });
  }
};

controller.save = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO furnituretype set ?',[data],(err,furnituretype) => {
        if(err){
          res.json(err);
        }
        console.log(furnituretype);
        res.redirect('/admin/furnituretype');
      });
    });
  }
};

controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM furnituretype WHERE id = ?',[id],(err,furnituretype) => {
        if(err){
          res.json(err);
        }
        console.log(furnituretype);
        res.redirect('/admin/furnituretype');
      });
    });
  }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err, apartment)=>{
        conn.query('SELECT * FROM furnituretype WHERE id = ?',[id],(err, furnituretype) => {
          res.render('./admin/furnituretypeForm',{
          data1:apartment,data2:furnituretype
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
      conn.query('UPDATE furnituretype SET ? WHERE id = ?',[data,id],(err,furnituretype) => {
        if(err){
          res.json(err);
        }
        console.log(furnituretype);
        res.redirect('/admin/furnituretype');
      });
    });
  }
};

module.exports = controller;
