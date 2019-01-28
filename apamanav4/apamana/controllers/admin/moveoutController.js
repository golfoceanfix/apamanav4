
const controller ={};


controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT moveout.id AS No,moveout.apartment_id AS Apname,customer.name AS Cname,room.name AS Rname,moveout.date_out AS Dateout,moveout.electric_meter AS Emeter,moveout.water_meter AS Wmeter,moveout.electric_price AS Eprice,moveout.water_price AS Wprice,moveout.trash_price AS Tprice,moveout.internet_price AS Iprice,moveout.fine AS Fine,moveout.bail_back AS Billback,moveout.status AS Status FROM moveout JOIN apartment ON moveout.apartment_id = apartment.id JOIN contract ON moveout.contract_id = contract.id JOIN customer ON contract.customer_id = customer.id JOIN room ON contract.room_id = room.id JOIN notice ON moveout.notice_id = notice.id', (err,moveout) => {
        if(err){
          res.json(moveout);
        }
        //console.log(customers);
        res.render('./admin/moveouts', {
          data:moveout

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
      conn.query('SELECT * FROM  notice',(err,notice) => {
        conn.query('SELECT customer.name AS Cname,room.name AS Rname,contract.id FROM  contract JOIN customer ON contract.customer_id = customer.id',(err,contract) => {
          res.render('./admin/moveinForm',{
            data1:apartment,data2:notice,data3:contract,data4:data
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
      conn.query('INSERT INTO moveout set ?',[data],(err,moveout) => {
        if(err){
          res.json(err);
        }
        console.log(moveout);
      res.redirect('/admin/moveout');
      });
    });
  }
};


controller.delete = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM moveout WHERE id= ?',[id],(err,moveout) => {
        if(err){
          res.json(err);
        }
        console.log(moveout);
        res.redirect('/admin/moveout');
      });
    });
  }
};


controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM  apartment',(err,apartment) => {
      conn.query('SELECT * FROM  notice',(err,notice) => {
        conn.query('SELECT * FROM  customer',(err,customer) => {
          conn.query('SELECT * FROM moveout WHERE id = ?',[id],(err,moveout) => {
          res.render('./admin/moveinForm',{
            data1:apartment,data2:notice,data3:customer,data4:moveout
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
        res.redirect('/admin/movein');
      });
    });
  }
};


module.exports = controller;
