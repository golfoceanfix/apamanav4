
const controller ={};


controller.list = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      req.getConnection((err,conn) => {
        conn.query('SELECT apartment.name AS Apname, room.name AS Rname, customer.name AS Cname, movein.date as Date, movein.status AS Status, movein.id AS No FROM movein JOIN apartment ON movein.apartment_id = apartment.id JOIN room ON movein.room_id = room.id JOIN contract ON movein.contact_id = contract.id JOIN customer ON contract.customer_id = customer.id', (err,movein) => {
          if(err){
            res.json(movein);
          }
          //console.log(customers);
          res.render('./admin/moveins', {
            data:movein

          });
        });
      });
    }
};


controller.new = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = null;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM  apartment',(err,apartment) => {
      conn.query('SELECT * FROM  room',(err,room) => {
        conn.query('SELECT customer.name,contract.id FROM  contract JOIN customer ON contract.customer_id = customer.id',(err,customer) => {
          res.render('./admin/moveinForm',{
            data1:apartment,data2:room,data3:customer,data4:data
            });
          });
        });
      });
    });
  }
};

controller.save = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('INSERT INTO movein set ?',[data],(err,movein) => {
        if(err){
          res.json(err);
        }
        console.log(movein);
      res.redirect('/admin/movein');
      });
    });
  }
};


controller.delete = (req , res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      req.getConnection((err, conn) => {
        conn.query('DELETE FROM movein WHERE id= ?',[id],(err,movein) => {
          if(err){
            res.json(err);
          }
          console.log(movein);
          res.redirect('/admin/movein');
        });
      });
    }
};


controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM  apartment',(err,apartment) => {
      conn.query('SELECT * FROM  room',(err,room) => {
        conn.query('SELECT customer.name,contract.id FROM  contract JOIN customer ON contract.customer_id = customer.id',(err,customer) => {
          conn.query('SELECT * FROM movein WHERE id = ?',[id],(err,movein) => {
          res.render('./admin/moveinForm',{
            data1:apartment,data2:room,data3:customer,data4:movein
              });
            });
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
      conn.query('UPDATE movein Set ? WHERE id = ? ',[data,id],(err,movein) => {
        if(err){
          res.json(err);
        }
        res.redirect('./admin//movein');
      });
    });
  }
};


module.exports = controller;
