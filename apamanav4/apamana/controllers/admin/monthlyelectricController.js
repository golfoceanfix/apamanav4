const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {data} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT monthlyelectric.id AS No, apartment.name AS Apname,room.name AS Rname,room.price AS Price,monthlyelectric.month AS month,monthlyelectric.year AS year FROM monthlyelectric JOIN room ON monthlyelectric.room_id = room.id JOIN apartment ON room.apartment_id = apartment.id', (err,monthlyelectric) => {
        if(err){
          res.json(monthlyelectric);
        }
        //console.log(customers);
        res.render('./admin/monthlyelectrics', {
          data:monthlyelectric

        });
      });
    });
  }
};


controller.new = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = null;
      req.getConnection((err,conn) => {
        conn.query('SELECT * from apartment',(err,apartment)=>{
          conn.query('SELECT * FROM room',(err,room) => {
            res.render('./admin/monthlyelectricForm',{
              data1:apartment,data2:room,data3:data
             });
          });
        });
      });
    }
};

controller.save = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data=req.body
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO monthlyelectric set WHERE month ?',[data],(err,monthlyelectric) =>{
        if(err){
          res.json(err);
        }
        console.log(month);
        res.redirect('/admin/monthlyelectric');
      });
    });
  }
};


controller.insert = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data=req.body
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO monthlyelectric set WHERE month ?',[data],(err,monthlyelectric) =>{
        if(err){
          res.json(err);
        }
        console.log(month);
        res.redirect('/admin/monthlyelectric');
      });
    });
  }
};


controller.create = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data=req.body
      req.getConnection((err,conn) => {
        conn.query('SELECT apartment.id from apartment',(err,apartment)=>{
          conn.query('SELECT room.id FROM room',(err,room) => {
              conn.query('INSERT INTO monthlyelectric (apartment_id,room_id,month,year) SELECT apartment_id,room.id,month(CURRENT_DATE),year(CURRENT_DATE) FROM room',[data],(err,monthlyelectric) =>{

          });
        });
      });
    });
  }
};

controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM monthlyelectric WHERE id = ?',[id],(err,monthlyelectric) => {
        if(err){
          res.json(err);
        }
        console.log(monthlyelectric);
        res.redirect('/admin/monthlyelectric');
      });
    });
  }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err,apartment)=>{
        conn.query('SELECT * FROM room',(err,room) => {
          conn.query('SELECT * FROM monthlyelectric WHERE id = ?',[id],(err, monthlyelectric) => {
            res.render('./admin/monthlyelectricForm',{
                data1:apartment,data2:roomtype,data3:monthlyelectric
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
      console.log(data);
      req.getConnection((err, conn) => {
        conn.query('UPDATE monthlyelectric SET ? WHERE id = ?',[data,id],(err,monthlyelectric) => {
          if(err){
            res.json(err);
          }
          console.log(monthlyelectric);
          res.redirect('/monthlyelectric');
        });
      });
    }
};

controller.submit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
          conn.query('UPDATE monthlyelectric SET month = month(cu),year = ? WHERE id = ? ',[data,id],(err,monthlyelectric) => {
        if(err){
          res.json(err);
        }
        console.log(data);
        res.redirect('/admin/monthlyelectric');
      });
    });
  }
};

module.exports = controller;
