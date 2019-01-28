const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT pay.id AS No,room.name AS Rname,apartment.name AS Apname,pay.amount AS Amount,pay.date AS Date,pay.status AS Status,pay.fine AS Fine,pay.appointment AS Appointment FROM pay JOIN bill ON pay.bill_id = bill.id JOIN room ON bill.room_id = room.id JOIN apartment ON pay.apartment_id = apartment.id', (err,pay) => {
        if(err){
          res.json(pay);
        }
        res.render('./admin/pays', {
          data:pay
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
        conn.query('SELECT room.name AS Cname,bill.id FROM  bill JOIN room ON bill.room_id = room.id',(err, room)=>{
        res.render('./admin/payForm',{
          data1:apartment,data2:room,data3:data
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
      conn.query('INSERT INTO pay set ?',[data],(err,pay) => {
        if(err){
          res.json(err);
        }
        res.redirect('/admin/pay');
      });
    });
  }
};





controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM pay WHERE id = ?',[id],(err,pay) => {
        if(err){
          res.json(err);
        }
        res.redirect('/admin/pay');
      });
    });
  }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err, apartment)=>{
        conn.query('SELECT * FROM room',(err, room)=>{
        conn.query('SELECT * FROM pay WHERE id = ?',[id],(err, pay) => {
          res.render('./admin/payForm',{
                data1:apartment,data2:room,data3:pay
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
        conn.query('UPDATE pay SET ? WHERE id = ?',[data,id],(err,pay) => {
          if(err){
            res.json(err);
          }
          res.redirect('/admin/pay');
        });
      });
    }
};


controller.pay = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
      conn.query('UPDATE pay set status = 1,fine = ? WHERE id = ?',[data,id,],(err,pay) => {
        conn.query('INSERT INTO pay (fine) values(?)',[data.fine],(err,monthlyelectric) =>{
        if(err){
          res.json(err);
        }
        console.log(data.fine);
        res.redirect('/admin/pay');
      });
    });
   });
  }
};

module.exports = controller;
