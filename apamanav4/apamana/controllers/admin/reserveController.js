const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT reserve.id as No, room.name as Rname,apartment.name as Apname,reserve.name as Name,reserve.address as Address,reserve.phone as Phone,reserve.date_reserve as Datere,reserve.date_outtime as Outtime,reserve.room_price as Price,reserve.balance_reserve as Balance,reserve.status as Status,reserve.id_card as Idcard,reserve.date_in Datein FROM reserve JOIN room ON reserve.room_id = room.id JOIN apartment ON reserve.apartment_id = apartment.id', (err,reserve) => {
        if(err){
          res.json(reserve);
        }
        //console.log(customers);
        res.render('./admin/reserves', {
          data:reserve

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
          res.render('./admin/reserveForm',{
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
        conn.query('INSERT INTO reserve set ?',[data],(err,reserve) =>{
          if(err){
            res.json(err);
          }
          console.log(reserve);
          res.redirect('/admin/reserve');
        });
      });
    }
};

controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM reserve WHERE id = ?',[id],(err,reserve) => {
        if(err){
          res.json(err);
        }
        console.log(reserve);
        res.redirect('/admin/reserve');
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
          conn.query('SELECT * FROM reserve WHERE id = ?',[id],(err, reserve) => {
            res.render('./admin/reserveForm',{
                data1:apartment,data2:room,data3:reserve
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
      conn.query('UPDATE reserve SET ? WHERE id = ?',[data,id],(err,reserve) => {
        if(err){
          res.json(err);
        }
        console.log(reserve);
        res.redirect('/admin/reserve');
      });
    });
  }
};

module.exports = controller;
