const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT management.id AS No,localadmin.username AS localid,apartment.name as Apname FROM management JOIN localadmin ON management.local_id = localadmin.id JOIN apartment ON management.apartment_id = apartment.id', (err,management) => {
        if(err){
          res.json(management);
        }
        res.render('./admin/managements', {
          data:management
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
        conn.query('SELECT * FROM localadmin',(err, localadmin)=>{
        res.render('./admin/managementForm',{
          data1:apartment,data2:localadmin,data3:data
        });
      });
    });
   });
  }
};

controller.save = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = req.body;
        console.log(data);
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO management set ?',[data],(err,management) => {
        if(err){
          res.json(err);
        }

        res.redirect('/admin/management');
      });
   });
  }
};

controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM management WHERE id = ?',[id],(err,management) => {
        if(err){
          res.json(err);
        }
        console.log(management);
        res.redirect('/admin/management');
      });
    });
  }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err, apartment)=>{
        conn.query('SELECT * FROM localadmin',(err, localadmin)=>{
        conn.query('SELECT * FROM management WHERE id = ?',[id],(err, management) => {
          res.render('./admin/managementForm',{
          data1:apartment,data2:localadmin,data3:management
          });
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
      conn.query('UPDATE management SET ? WHERE id = ?',[data,id],(err,management) => {
        if(err){
          res.json(err);
        }
        console.log(management);
        res.redirect('/admin/management');
      });
    });
  }
};

module.exports = controller;
