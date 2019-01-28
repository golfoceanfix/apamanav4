const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {data} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT monthlywater.id AS No, apartment.name AS Apname,room.name AS Rname,room.price AS Price,monthlywater.month AS month,monthlywater.year AS year FROM monthlywater JOIN room ON monthlywater.room_id = room.id JOIN apartment ON room.apartment_id = apartment.id', (err,monthlywater) => {
        if(err){
          res.json(monthlywater);
        }
        //console.log(customers);
        res.render('./admin/monthlywaters', {
          data:monthlywater

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
          res.render('./admin/monthlywaterForm',{
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
        conn.query('INSERT INTO monthlywater set WHERE month ?',[data],(err,monthlywater) =>{
          if(err){
            res.json(err);
          }
          console.log(month);
          res.redirect('/admin/monthlywater');
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
            conn.query('INSERT INTO monthlywater (apartment_id,room_id,month,year) values(?,?,?,?)',[apartment[1],room[1],data.month,data.year],(err,monthlywater) =>{
                console.log(apartment[1]);
                console.log(room[1]);
                console.log(data.month);
                console.log(data.year);
              });
            });
          });
        });
      }
};
/*
controller.create2 = (req,res) => {
  const data=req.body

  req.getConnection((err,conn) => {
    conn.query('SELECT apartment.id from apartment',(err,apartment)=>{
      conn.query('SELECT room.id FROM room',(err,room) => {
        for (var i = 0; i < room.length; i++) {
          var values = [apartment[i],room[i]];
        }
        console.log(values);
    });
  });
});

req.getConnection((err,conn) => {
conn.query('INSERT INTO monthlyelectric (apartment_id,room_id,month,year) values(?,?,?,?)',[apartment[1],room[1],data.month,data.year],(err,monthlyelectric) =>{
    //console.log(apartment[1]);
    //console.log(room[1]);
    //console.log(data.month);
    //console.log(data.year);
});
});
};
*/
controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM monthlywater WHERE id = ?',[id],(err,monthlywater) => {
        if(err){
          res.json(err);
        }
        console.log(monthlywater);
        res.redirect('/admin/monthlywater');
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
          conn.query('SELECT * FROM monthlywater WHERE id = ?',[id],(err, monthlywater) => {
            res.render('./admin/monthlyelectricForm',{
                data1:apartment,data2:roomtype,data3:monthlywater
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
      conn.query('UPDATE monthlywater SET ? WHERE id = ?',[data,id],(err,monthlywater) => {
        if(err){
          res.json(err);
        }
        console.log(monthlywater);
        res.redirect('./admin/monthlywater');
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
          conn.query('UPDATE monthlywater SET month = month(cu),year = ? WHERE id = ? ',[data,id],(err,monthlywater) => {
        if(err){
          res.json(err);
        }
        console.log(data);
        res.redirect('/admin/monthlywater');
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
            conn.query('INSERT INTO monthlywater (apartment_id,room_id,month,year) SELECT apartment_id,room.id,month(CURRENT_DATE),year(CURRENT_DATE) FROM room',[data],(err,monthlywater) =>{

        });
      });
    });
   });
  }
};

module.exports = controller;
