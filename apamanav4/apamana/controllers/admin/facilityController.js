const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT apartment.name as apartmentname, facility.id,facility.name, facility.detail FROM facility JOIN apartment ON facility.apartment_id = apartment.id', (err,facility) => {
        if(err){
          res.json(facility);
        }
        res.render('./admin/facilitys', {
          data:facility
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
          res.render('./admin/facilityForm',{
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
        conn.query('INSERT INTO facility set ?',[data],(err,facility) => {
          if(err){
            res.json(err);
          }
          console.log(facility);
          res.redirect('/admin/facility');
        });
      });
    }
};

controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM facility WHERE id = ?',[id],(err,facility) => {
        if(err){
          res.json(err);
        }
        console.log(facility);
        res.redirect('/admin/facility');
      });
    });
  }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err, apartment)=>{
        conn.query('SELECT * FROM facility WHERE id = ?',[id],(err, facility) => {
          res.render('./admin/facilityForm',{
          data1:apartment,data2:facility
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
      conn.query('UPDATE facility SET ? WHERE id = ?',[data,id],(err,facility) => {
        if(err){
          res.json(err);
        }
        console.log(facility);
        res.redirect('/admin/facility');
      });
    });
  }
};

module.exports = controller;
