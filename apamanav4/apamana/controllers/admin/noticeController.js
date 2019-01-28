
const controller ={};


controller.list = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      req.getConnection((err,conn) => {
        conn.query('SELECT notice.id as No,apartment.name as Apname,room.name as Rname,customer.name as Cname,notice.date as Date,notice.out_date as Odate,notice.status as Status FROM notice JOIN apartment ON notice.apartment_id = apartment.id JOIN room ON notice.room_id = room.id JOIN contract ON notice.contract_id = contract.id JOIN customer ON contract.customer_id = customer.id', (err,notice) => {
          if(err){
            res.json(notice);
          }

          res.render('./admin/notices', {
            data:notice

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
          res.render('./admin/noticeForm',{
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
      conn.query('INSERT INTO notice set ?',[data],(err,notice) => {
        if(err){
          res.json(err);
        }
        console.log(notice);
      res.redirect('/admin/notice');
      });
    });
  }
};


controller.delete = (req , res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM notice WHERE id= ?',[id],(err,notice) => {
        if(err){
          res.json(err);
        }
        console.log(notice);
        res.redirect('/admin/notice');
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
          conn.query('SELECT * FROM  customer',(err,customer) => {
            conn.query('SELECT * FROM notice WHERE id = ?',[id],(err,notice) => {
            res.render('./admin/noticeForm',{
              data1:apartment,data2:room,data3:customer,data4:notice
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
        conn.query('UPDATE notice Set ? WHERE id = ? ',[data,id],(err,notice) => {
          if(err){
            res.json(err);
          }
          res.redirect('/admin/notice');
        });
      });
    }
};

controller.moveout = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      const data = req.body;
      console.log(data);
      req.getConnection((err, conn) => {
        conn.query('UPDATE moveout set status = 1 WHERE id = ?',[data.status,id,],(err,moveout) => {
          if(err){
            res.json(err);
          }
          console.log(data.fine);
          res.redirect('/admin/moveout');
        });
      });
    }
};

module.exports = controller;
