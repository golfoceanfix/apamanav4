const controller= {};

// controller.list = (req,res) => {
//   if ( typeof req.session.adminid == 'undefined') {  res.render('logins')} else {
//     req.getConnection((err,conn) => {
//       conn.query('SELECT room.id AS id,room.name AS Rname,apartment.name AS Apname,monthlyelectric.unit AS Elunit,monthlywater.unit AS Waunit,monthlyelectric.month AS month,monthlyelectric.year AS year  FROM room LEFT JOIN monthlyelectric ON monthlyelectric.room_id = room.id LEFT JOIN monthlywater ON monthlywater.room_id = room.id JOIN apartment ON room.apartment_id = apartment.id WHERE room.apartment_id = ?',[req.session.apmid],(err,room) =>{
//         if(err){
//           res.json(err);
//         } else {
//           res.render('listelewas',
//           {
//             data:room
//           });
//         }

//         });

//     });
//   }
// };

controller.list = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')}else {
    req.getConnection((err,conn) => {
      conn.query('SELECT bill.id AS No,apartment.name AS Apname,room.name AS Rname ,customer.name AS Cname ,bill.internetprice AS internetprice,bill.electricprice AS electricprice,bill.waterprice AS waterprice,bill.serviceprice AS serviceprice,bill.trashprice AS trashprice,bill.roomprice AS roomprice,bill.fine AS fine,bill.month AS month,bill.year AS year,bill.date AS date FROM bill JOIN apartment ON bill.apartment_id = apartment.id JOIN room ON bill.room_id = room.id JOIN contract ON bill.contract_id =contract.id JOIN customer ON contract.customer_id = customer.id WHERE bill.apartment_id = ?',[req.session.apmid] ,(err,bill) => {
        if(err){
          res.json(bill);
        }
        res.render('bills', {
          data:bill

        });
      });
    });
  }
};


controller.list2 = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')} else {
    req.getConnection((err,conn) => {
      conn.query('SELECT apartment.name AS Apname,room.name AS name,contract.id AS contractid,bill.internetprice AS internetprice,bill.electricprice AS electricprice,bill.waterprice AS waterprice,bill.trashprice AS trashprice,bill.roomprice AS roomprice,bill.fine AS fine FROM bill JOIN apartment ON bill.apartment_id = apartment.id JOIN room ON bill.room_id = room.id JOIN contract ON bill.contract_id = contract.id WHERE bill.apartment_id = ?',[req.session.apmid],(err,bill) =>{
        if(err){
          res.json(err);
        } else {
          res.render('bills',{data:bill});
        }

        });

    });
  }
};


controller.list3 = (req,res) => {
  if ( typeof req.session.adminid == 'undefined') {  res.render('logins')} else {
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM bill',[req.session.apmid],(err,bill) =>{
        if(err){
          res.json(err);
        } else {
          res.render('printbill',
          {
            data:bill
          });
        }

        });

    });
  }
};

module.exports = controller;
