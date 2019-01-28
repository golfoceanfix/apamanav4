const controller = {};

// controller.list = (req,res) => {
//   if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
//     const {data} = req.params;
//     const nu = null;
//     req.getConnection((err,conn) => {
//       conn.query('SELECT monthlyelectric.id AS No, apartment.name AS Apname,room.name AS Rname,room.price AS Price,monthlyelectric.month AS month,monthlyelectric.year AS year FROM monthlyelectric JOIN room ON monthlyelectric.room_id = room.id JOIN apartment ON room.apartment_id = apartment.id WHERE monthlyelectric.apartment_id = ?',[req.session.apmid], (err,monthlyelectric) => {
//         if(err){
//           res.json(monthlyelectric);
//         }
//         res.render('monthlyelectrics', {
//           data1:monthlyelectric,data:nu
//         });
//       });
//     });
//   }
// };

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    res.render('monthlywaters', {
      data:null
    });
  }
};

controller.list2 = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    const data = req.body;
    req.getConnection((err,conn) => {
      conn.query('SELECT apartment.name AS Apname,room.name AS Rname,room.id AS Rid,apartment.id AS Aid,monthlywater.unit AS Unit,monthlywater.month AS Month,monthlywater.year AS Year FROM monthlywater RIGHT JOIN room ON monthlywater.room_id =room.id JOIN apartment ON room.apartment_id = apartment.id WHERE monthlywater.month = ? AND monthlywater.year = ? AND room.apartment_id = ?',[data.month,data.year,req.session.apmid], (err,monthlywater) => {
        conn.query('SELECT apartment.name AS Apname,room.name AS Rname,room.id AS Rid,apartment.id AS Aid,monthlywater.unit AS Unit,month(CURRENT_DATE) AS month1 ,year(CURRENT_DATE) AS year1 FROM monthlywater RIGHT JOIN room ON monthlywater.room_id =room.id JOIN apartment ON room.apartment_id = apartment.id WHERE room.apartment_id = ?',[req.session.apmid], (err,monthlywater1) => {
          if(err){
            res.json(monthlywater);
          }
          res.render('monthlywaters1', {
            data:monthlywater,data1:monthlywater1,data3:data.month,data4:data.year
          });
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
        conn.query('SELECT * FROM room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
          res.render('monthlywaterForm',{
            data1:apartment,data2:room,data3:data
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
      conn.query('INSERT INTO monthlywater SET ?',[data],(err,monthlywater) =>{
        if(err){
          res.json(err);
        }
        else {
          conn.query('SELECT apartment.name AS Apname,room.name AS Rname,room.id AS Rid,apartment.id AS Aid,monthlywater.unit AS Unit,monthlywater.month AS Month,monthlywater.year AS Year FROM monthlywater RIGHT JOIN room ON monthlywater.room_id =room.id JOIN apartment ON room.apartment_id = apartment.id WHERE monthlywater.month = ? AND monthlywater.year = ? AND room.apartment_id = ?',[data.month,data.year,req.session.apmid], (err,monthlywater) => {
            conn.query('SELECT apartment.name AS Apname,room.name AS Rname,room.id AS Rid,apartment.id AS Aid,monthlywater.unit AS Unit,month(CURRENT_DATE) AS month1 ,year(CURRENT_DATE) AS year1 FROM monthlywater RIGHT JOIN room ON monthlywater.room_id =room.id JOIN apartment ON room.apartment_id = apartment.id WHERE room.apartment_id = ?',[req.session.apmid], (err,monthlywater1) => {
              if(err){
                res.json(monthlywater);
              }
              res.render('monthlywaters1', {
                data:monthlywater,data1:monthlywater1,data3:data.month,data4:data.year
              });
            });
          });
        }
      });
    });
  }
};


controller.insert = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const data=req.body
      req.getConnection((err,conn) =>{
        conn.query('INSERT INTO monthlywater set WHERE month ? AND apartment_id = ?',[data,req.session.apmid],(err,monthlywater) =>{
          if(err){
            res.json(err);
          }
          res.redirect('/monthlywater');
        });
      });
    }
};


controller.create = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const data=req.body
      req.getConnection((err,conn) => {
        conn.query('SELECT apartment.id from apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
          conn.query('SELECT room.id FROM room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
              conn.query('INSERT INTO monthlywater (apartment_id,room_id,month,year) SELECT apartment_id,room.id,month(CURRENT_DATE),year(CURRENT_DATE) FROM room WHERE apartment_id = ?',[data,req.session.apmid],(err,monthlywater) =>{

          });
        });
      });
     });
    }
};

controller.delete = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const {id} = req.params;
      req.getConnection((err, conn) => {
        conn.query('DELETE FROM monthlywater WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err,monthlywater) => {
          if(err){
            res.json(err);
          }
          res.redirect('/monthlywater');
        });
      });
    }
};

controller.edit = (req,res) => {
    if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
      const {id} = req.params;
      req.getConnection((err,conn) => {
        conn.query('SELECT * FROM apartment WHERE id = ?',[req.session.apmid],(err,apartment)=>{
          conn.query('SELECT * FROM room WHERE apartment_id = ?',[req.session.apmid],(err,room) => {
            conn.query('SELECT * FROM monthlywater WHERE id = ? AND apartment_id = ?',[id,req.session.apmid],(err, monthlywater) => {
              res.render('monthlywaterForm',{
                  data1:apartment,data2:roomtype,data3:monthlywater
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
        conn.query('UPDATE monthlywater SET ? WHERE id = ? WHERE apartment_id = ?',[data,id,req.session.apmid],(err,monthlywater) => {
          if(err){
            res.json(err);
          }
          res.redirect('/monthlywater');
        });
      });
    }
};



module.exports = controller;
