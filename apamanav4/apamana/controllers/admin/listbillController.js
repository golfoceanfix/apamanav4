const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT room.id as No,room.name as Name,apartment.name as Aname,roomtype.name as Rname,room.price as Price,room.floor as Floor,room.usable as Usable,room.detail as Detail from room JOIN apartment on room.apartment_id = apartment.id JOIN roomtype on room.roomtype_id = roomtype.id', (err,room) => {
        if(err){
          res.json(room);
        }
        //console.log(customers);
        res.render('./admin/listbills', {
          data:room

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
          conn.query('SELECT * FROM roomtype',(err,roomtype) => {
            res.render('./admin/roomForm',{
              data1:apartment,data2:roomtype,data3:data
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
      conn.query('INSERT INTO room set ?',[data],(err,room) =>{
        if(err){
          res.json(err);
        }
        console.log(room);
        res.redirect('/admin/room');
      });
    });
  }
};

controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM room WHERE id = ?',[id],(err,room) => {
        if(err){
          res.json(err);
        }
        console.log(room);
        res.redirect('/admin/room');
      });
    });
  }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err,apartment)=>{
        conn.query('SELECT * FROM roomtype',(err,roomtype) => {
          conn.query('SELECT * FROM room WHERE id = ?',[id],(err, room) => {
            res.render('./admin/listbillForm',{
                data1:apartment,data2:roomtype,data3:room
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
      conn.query('UPDATE room SET ? WHERE id = ?',[data,id],(err,room) => {
        if(err){
          res.json(err);
        }
        console.log(room);
        res.redirect('/admin/listbill');
      });
    });
  }
};

module.exports = controller;
