const controller = {};

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT room.id as No,room.name as Name,apartment.name as Aname,roomtype.name as Rname,room.price as Price,room.floor as Floor,room.usable as Usable,room.detail as Detail from room JOIN apartment on room.apartment_id = apartment.id JOIN roomtype on room.roomtype_id = roomtype.id WHERE room.apartment_id = ?',[req.session.apmid], (err,room) => {
        if(err){
          res.json(room);
        }
        res.render('listbills', {
          data:room
        });
      });
    });
  }
};

controller.new = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const data = null;
      req.getConnection((err,conn) => {
        conn.query('SELECT * from apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
          conn.query('SELECT * FROM roomtype WHERE apartment_id = ?',[req.session.apmid],(err,roomtype) => {
            res.render('roomForm',{
              data1:apartment,data2:roomtype,data3:data
             });
          });
        });
      });
    }
};

controller.save = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const data=req.body
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO room set ?',[data],(err,room) =>{
        if(err){
          res.json(err);
        }
        res.redirect('/room');
      });
    });
  }
};

controller.delete = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM room WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,room) => {
        if(err){
          res.json(err);
        }
        res.redirect('/room');
      });
    });
  }
};

controller.edit = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
        conn.query('SELECT * FROM roomtype WHERE apartment_id = ?',[req.session.apmid],(err,roomtype) => {
          conn.query('SELECT * FROM room WHERE id = ? WHERE apartment_id = ?',[id,req.session.apmid],(err, room) => {
            res.render('listbillForm',{
                data1:apartment,data2:roomtype,data3:room
            });
          });
        });
      });
    });
  }
};

controller.update = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const {id} = req.params;
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query('UPDATE room SET ? WHERE id = ? AND apartment_id = ?',[data,id,req.session.apmid],(err,room) => {
        if(err){
          res.json(err);
        }
        res.redirect('/listbill');
      });
    });
  }
};

module.exports = controller;
